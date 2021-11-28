
const vec3 = glMatrix.vec3;

window.onload = () => {
    {
        var playAnimation = true;
        var current_t = 0;

        document.addEventListener('keydown', function(e) {
            switch(e.key) {
                case 'k':
                    playAnimation = !playAnimation;
                    break;
            }
        });

        const app = new App(document.getElementById('canvas1'));
        app.background_color = [1.0, 1.0, 1.0, 1.0];

        app.camera.position = vec3.fromValues(0, -100, 0);
        app.camera.target = vec3.fromValues(0, 0, 0);

        app.on_update = (dt, t) => {
            if (playAnimation) {
                current_t += dt;
            }

            torus.rotation = vec3.fromValues(90, 0, -100*current_t % 360 + 45);

            sphere1.position = glMatrix.vec3.fromValues(Math.sin(current_t) * 10, Math.cos(current_t) * 10 + 10, 0);
            sphere2.position = glMatrix.vec3.fromValues(Math.sin(current_t) * 10, Math.cos(current_t) * 10 + 10, Math.sin(current_t) * 10);
            sphere3.position = glMatrix.vec3.fromValues(Math.cos(current_t) * -10, Math.sin(current_t) * 10 + 10, Math.cos(current_t) * 10);
            sphere4.position = glMatrix.vec3.fromValues(0, Math.sin(current_t) * 10, Math.cos(current_t) * 10 + 10);
        };

        var torus = new Model(VERTEX_SHADER_SOURCE, FRAGMENT_SHADER_SOURCE);
        app.add_model(torus);
        // Create Cube
        {
            var torus_data = torus_createVertexData();
            torus.indices = torus_data["indicesTriangles"];
            torus.vertex_normals = torus_data["normals"];
            torus.vertex_positions = torus_data["vertices"];
            torus.vertex_colors = FILL_COLOR(torus_data["vertices"].length, [1.0, 1.0, 0.0, 1.0]);
        };
        torus.position = vec3.fromValues(0, 0, 0);
        torus.scale = vec3.fromValues(10, 10, 3);

        var sphere1 = new Model(VERTEX_SHADER_SOURCE, FRAGMENT_SHADER_SOURCE);
        app.add_model(sphere1);
        // Create Cube
        {
            var sphere_data = sphere_createVertexData();
            sphere1.indices = sphere_data["indicesTriangles"];
            sphere1.vertex_normals = sphere_data["normals"];
            sphere1.vertex_positions = sphere_data["vertices"];
            sphere1.vertex_colors = FILL_COLOR(sphere_data["vertices"].length, [1.0, 0.0, 0.0, 1.0]);
        };
        sphere1.position = vec3.fromValues(0, 3, 0);

        var sphere2 = new Model(VERTEX_SHADER_SOURCE, FRAGMENT_SHADER_SOURCE);
        app.add_model(sphere2);
        // Create Cube
        {
            var sphere_data = sphere_createVertexData();
            sphere2.indices = sphere_data["indicesTriangles"];
            sphere2.vertex_normals = sphere_data["normals"];
            sphere2.vertex_positions = sphere_data["vertices"];
            sphere2.vertex_colors = FILL_COLOR(sphere_data["vertices"].length, [1.0, 0.0, 1.0, 1.0]);
        };
        sphere2.position = vec3.fromValues(0, -3, 0);

        var sphere3 = new Model(VERTEX_SHADER_SOURCE, FRAGMENT_SHADER_SOURCE);
        app.add_model(sphere3);
        // Create Cube
        {
            var sphere_data = sphere_createVertexData();
            sphere3.indices = sphere_data["indicesTriangles"];
            sphere3.vertex_normals = sphere_data["normals"];
            sphere3.vertex_positions = sphere_data["vertices"];
            sphere3.vertex_colors = FILL_COLOR(sphere_data["vertices"].length, [1.0, 1.0, 1.0, 1.0]);
        };
        sphere3.position = vec3.fromValues(0, 0, 3);

        var sphere4 = new Model(VERTEX_SHADER_SOURCE, FRAGMENT_SHADER_SOURCE);
        app.add_model(sphere4);
        // Create Cube
        {
            var sphere_data = sphere_createVertexData();
            sphere4.indices = sphere_data["indicesTriangles"];
            sphere4.vertex_normals = sphere_data["normals"];
            sphere4.vertex_positions = sphere_data["vertices"];
            sphere4.vertex_colors = FILL_COLOR(sphere_data["vertices"].length, [0.0, 1.0, 1.0, 1.0]);
        };
        sphere4.position = vec3.fromValues(0, 0, -3);

        app.run();
    }
};