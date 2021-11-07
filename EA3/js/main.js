(function () {

    const TREE_START = [0, -1];
    const BRANCH_LENGTH = [0.25, 0.5]; // MIN, MAX
    const BRANCH_LENGTH_DEG = [0.025, 0.05]; // MIN, MAX, degeneration per iteration
    const BRANCH_ANGLE = [-30, 30]; // MIN, MAX in DEG]
    const NUM_BRANCHES = [1, 1]; // MIN, MAX
    const NUM_BRANCHES_INC = [1, 1]; // MIN, MAX
    const MAX_ITERATIONS = 3; // MIN, MAX
    const WIDTH_DEG = 0.02;

    const COLORS = [
        [218 / 255, 169 / 255, 109 / 255, 1.0],
        [178 / 255, 118 / 255, 60 / 255, 1.0],
        [239 / 255, 197 / 255, 154 / 255, 1.0],
        [116 / 255, 58 / 255, 16 / 255, 1.0],
        [148 / 255, 115 / 255, 74 / 255, 1.0]
    ];


    const CANVAS = document.getElementById('canvas');
    const GL_CONTEXT = canvas.getContext('experimental-webgl');

    /**
     * Load and set vertex shader
     */
    var vertex_shader = GL_CONTEXT.createShader(GL_CONTEXT.VERTEX_SHADER);
    GL_CONTEXT.shaderSource(vertex_shader, VERTEX_SHADER_SOURCE);
    GL_CONTEXT.compileShader(vertex_shader);

    /**
     * Load and set fragment shader
     */
    var fragment_shader = GL_CONTEXT.createShader(GL_CONTEXT.FRAGMENT_SHADER);
    GL_CONTEXT.shaderSource(fragment_shader, FRAGMENT_SHADER_SOURCE);
    GL_CONTEXT.compileShader(fragment_shader);

    var shader_program = GL_CONTEXT.createProgram();
    GL_CONTEXT.attachShader(shader_program, vertex_shader);
    GL_CONTEXT.attachShader(shader_program, fragment_shader);
    GL_CONTEXT.linkProgram(shader_program);

    var coordAttr = GL_CONTEXT.getAttribLocation(shader_program, "coordinates");
    GL_CONTEXT.enableVertexAttribArray(coordAttr);

    var colorAttr = GL_CONTEXT.getAttribLocation(shader_program, "color");
    GL_CONTEXT.enableVertexAttribArray(colorAttr);

    GL_CONTEXT.enable(GL_CONTEXT.DEPTH_TEST);

    /**
     * Draws two triangles which should look like a branch.
     */
    function draw_branch(from, to, width_from, width_to, color_a, color_b) {

        var slope = (to[1] - from[1]) / (to[0] - from[0]);
        var perpendicular_slope = -1 / slope;

        var A = [
            from[0] + 0.5 * width_from * Math.cos(perpendicular_slope),
            from[1] + 0.5 * width_from * Math.sin(perpendicular_slope)
        ];

        var B = [
            from[0] - 0.5 * width_from * Math.cos(perpendicular_slope),
            from[1] - 0.5 * width_from * Math.sin(perpendicular_slope)
        ];

        var C = [
            to[0] + 0.5 * width_to * Math.cos(perpendicular_slope),
            to[1] + 0.5 * width_to * Math.sin(perpendicular_slope)
        ];

        var D = [
            to[0] - 0.5 * width_to * Math.cos(perpendicular_slope),
            to[1] - 0.5 * width_to * Math.sin(perpendicular_slope)
        ];

        var vertices = [
            C[0], C[1],
            A[0], A[1],
            B[0], B[1],

            C[0], C[1],
            D[0], D[1],
            B[0], B[1]
        ];

        var colors = [
            color_a[0], color_a[1], color_a[2], color_a[3],
            color_b[0], color_b[1], color_b[2], color_b[3],
            color_a[0], color_a[1], color_a[2], color_a[3],

            color_b[0], color_b[1], color_b[2], color_b[3],
            color_a[0], color_a[1], color_a[2], color_a[3],
            color_b[0], color_b[1], color_b[2], color_b[3]
        ];

        var vertex_buffer = GL_CONTEXT.createBuffer();
        GL_CONTEXT.bindBuffer(GL_CONTEXT.ARRAY_BUFFER, vertex_buffer);
        GL_CONTEXT.bufferData(GL_CONTEXT.ARRAY_BUFFER, new Float32Array(vertices), GL_CONTEXT.STATIC_DRAW);
        GL_CONTEXT.vertexAttribPointer(coordAttr, 2, GL_CONTEXT.FLOAT, false, 0, 0);
        GL_CONTEXT.bindBuffer(GL_CONTEXT.ARRAY_BUFFER, null);

        var color_buffer = GL_CONTEXT.createBuffer();
        GL_CONTEXT.bindBuffer(GL_CONTEXT.ARRAY_BUFFER, color_buffer);
        GL_CONTEXT.bufferData(GL_CONTEXT.ARRAY_BUFFER, new Float32Array(colors), GL_CONTEXT.STATIC_DRAW);
        GL_CONTEXT.vertexAttribPointer(colorAttr, 4, GL_CONTEXT.FLOAT, false, 0, 0);
        GL_CONTEXT.bindBuffer(GL_CONTEXT.ARRAY_BUFFER, null);

        GL_CONTEXT.useProgram(shader_program);
        GL_CONTEXT.drawArrays(GL_CONTEXT.TRIANGLES, 0, 3);
        GL_CONTEXT.drawArrays(GL_CONTEXT.TRIANGLES, 3, 3);
        GL_CONTEXT.useProgram(null);
    };

    function next_point(angle, distance) {
        const angle_rad = (angle + 90) * Math.PI / 180;
        return [distance * Math.cos(angle_rad), distance * Math.sin(angle_rad)];
    }

    function render_branches(point, length, iteration, current_angle, current_width, num_branches) {
        iteration = iteration + 1;
        if (iteration > MAX_ITERATIONS) return;

        var next_num_branches = num_branches;
        next_num_branches[0] += NUM_BRANCHES_INC[0];
        next_num_branches[1] += NUM_BRANCHES_INC[1];

        var next_width = current_width - WIDTH_DEG;

        var branches = RANDOM_INT(num_branches);
        for (var i = 0; i < branches; i++) {

            var from = point;
            var next_angle = RANDOM(BRANCH_ANGLE) + current_angle;
            var next = next_point(next_angle, RANDOM(length));
            var to = [from[0] + next[0], from[1] + next[1]];
            draw_branch(from, to, current_width, next_width, COLORS[RANDOM_INT([0, COLORS.length])], COLORS[RANDOM_INT([0, COLORS.length])]);

            render_branches(to, length, iteration, next_angle, next_width, next_num_branches);
        }
    }

    function render_random_tree() {
        GL_CONTEXT.clearColor(0.0, 0.0, 0.0, 1.0);
        GL_CONTEXT.clear(GL_CONTEXT.COLOR_BUFFER_BIT | GL_CONTEXT.DEPTH_BUFFER_BIT);
        GL_CONTEXT.viewport(0, 0, CANVAS.width, CANVAS.height);

        render_branches(TREE_START, BRANCH_LENGTH, 0, 0, 0.06, NUM_BRANCHES);
    };

    render_random_tree();
})();