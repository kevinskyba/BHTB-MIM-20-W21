(function () {

    const TREE_START = [0, -1];
    const BRANCH_LENGTH = [0.25, 0.5]; // MIN, MAX
    const BRANCH_LENGTH_DEG = [0.025, 0.05]; // MIN, MAX, degeneration per iteration
    const BRANCH_ANGLE = [-30, 30]; // MIN, MAX in DEG]
    const NUM_BRANCHES = [1, 1]; // MIN, MAX
    const NUM_BRANCHES_INC = [1, 2]; // MIN, MAX
    const MAX_ITERATIONS = 3; // MIN, MAX


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

    GL_CONTEXT.enable(GL_CONTEXT.DEPTH_TEST);

    /**
     * Draws a simple line which should look like a branch
     */
    function draw_line(from, to, color) {
        var vertices = [
            from[0], from[1], 0,
            to[0], to[1], 0
        ];


        var vertex_buffer = GL_CONTEXT.createBuffer();
        GL_CONTEXT.bindBuffer(GL_CONTEXT.ARRAY_BUFFER, vertex_buffer);
        GL_CONTEXT.bufferData(GL_CONTEXT.ARRAY_BUFFER, new Float32Array(vertices), GL_CONTEXT.STATIC_DRAW);
            GL_CONTEXT.vertexAttribPointer(coordAttr, 3, GL_CONTEXT.FLOAT, false, 0, 0);
            GL_CONTEXT.useProgram(shader_program);
                GL_CONTEXT.drawArrays(GL_CONTEXT.LINES, 0, 2);
            GL_CONTEXT.useProgram(null);
        GL_CONTEXT.bindBuffer(GL_CONTEXT.ARRAY_BUFFER, null);
    };

    function next_point(angle, distance) {
        const angle_rad = (angle + 90) * Math.PI / 180;
        return [distance * Math.cos(angle_rad), distance * Math.sin(angle_rad)];
    }

    function render_branches(point, length, iteration, current_angle, num_branches) {
        iteration = iteration + 1;
        if (iteration > MAX_ITERATIONS) return;

        var next_num_branches = num_branches;
        next_num_branches[0] += NUM_BRANCHES_INC[0];
        next_num_branches[1] += NUM_BRANCHES_INC[1];

        var branches = RANDOM_INT(num_branches);
        for (var i = 0; i < branches; i++) {
            
            var from = point;
            var next_angle = RANDOM(BRANCH_ANGLE) + current_angle;
            var next = next_point(next_angle, RANDOM(length));
            var to = [from[0] + next[0], from[1] + next[1]];
            draw_line(from, to, [1.0, 0.0, 0.0, 1.0]);

            render_branches(to, length, iteration, next_angle, next_num_branches);
        }
    }

    function render_random_tree() {
        GL_CONTEXT.clearColor(0.0, 0.0, 0.0, 1.0);
        GL_CONTEXT.clear(GL_CONTEXT.COLOR_BUFFER_BIT | GL_CONTEXT.DEPTH_BUFFER_BIT);
        GL_CONTEXT.viewport(0, 0, CANVAS.width, CANVAS.height);

        render_branches(TREE_START, BRANCH_LENGTH, 0, 0, NUM_BRANCHES);
    };

    render_random_tree();
})();