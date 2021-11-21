
window.onload = () => {
    {

        const app = new App(document.getElementById('canvas1'));
        app.on_update = (dt, t) => {
            app.camera.move_to(2, 2, 4);
            app.camera.look_at(0, 0, 0);
        };

        var cube = new Model(VERTEX_SHADER_SOURCE, FRAGMENT_SHADER_SOURCE);
        app.add_model(cube);
        // Create Cube
        {
            var vertices = new Float32Array([
                -1, -1, -1, 1, -1, -1, 1, 1, -1, -1, 1, -1,
                -1, -1, 1, 1, -1, 1, 1, 1, 1, -1, 1, 1,
                -1, -1, -1, -1, 1, -1, -1, 1, 1, -1, -1, 1,
                1, -1, -1, 1, 1, -1, 1, 1, 1, 1, -1, 1,
                -1, -1, -1, -1, -1, 1, 1, -1, 1, 1, -1, -1,
                -1, 1, -1, -1, 1, 1, 1, 1, 1, 1, 1, -1,
            ]);
            var colors = new Float32Array([
                0, 0, 1, 1, 0, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 1,
                0, 0, 1, 1, 0, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 1,
                0, 0, 1, 1, 0, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 1,
                0, 0, 1, 1, 0, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 1,
                0, 0, 1, 1, 0, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 1,
                0, 0, 1, 1, 0, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 1
            ]);
            var indices = new Uint16Array([
                0, 1, 2, 
                0, 2, 3, 
                4, 5, 6, 
                4, 6, 7,
                8, 9, 10, 
                8, 10, 11, 
                12, 13, 14, 
                12, 14, 15,
                16, 17, 18, 
                16, 18, 19, 
                20, 21, 22, 
                20, 22, 23
            ]);

            cube.indices = indices;
            cube.vertex_positions = vertices;
            cube.vertex_colors = colors;
        }
        cube.move_to(0, 0, 0);

        var pyramid = new Model(VERTEX_SHADER_SOURCE, FRAGMENT_SHADER_SOURCE);
        app.add_model(pyramid);
        // Create Cube
        {
            var vertices = new Float32Array([
                // Front face
                0.0, 1.0, 0.0,
                -1.0, -1.0, 1.0,
                1.0, -1.0, 1.0,
                // Right face
                0.0, 1.0, 0.0,
                1.0, -1.0, 1.0,
                1.0, -1.0, -1.0,
                // Back face
                0.0, 1.0, 0.0,
                1.0, -1.0, -1.0,
                -1.0, -1.0, -1.0,
                // Left face
                0.0, 1.0, 0.0,
                -1.0, -1.0, -1.0,
                -1.0, -1.0, 1.0
            ]);
            var colors = new Float32Array([
                1, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1,
                1, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1,
                1, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1,
                1, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1
            ]);
            var indices = new Uint16Array([
                0, 1, 2,
                3, 4, 5,
                6, 7, 8,
                9, 10, 11
            ]);

            pyramid.indices = indices;
            pyramid.vertex_positions = vertices;
            pyramid.vertex_colors = colors;
        }

        pyramid.move_to(100, 0, 0);

        app.run();
    }
};