
const vec3 = glMatrix.vec3;

const camStart = vec3.fromValues(0, -10, 10);
const camStartTarget = vec3.fromValues(0, 0, 0);

var pressedKeys = {};

window.onload = () => {
    {
        var camOffset_X = 0;
        var camOffset_Y = 0;
        var camOffset_Z = 0;

        document.addEventListener('keydown', function (e) {
            pressedKeys[e.key] = true;
        });


        document.addEventListener('keyup', function (e) {
            pressedKeys[e.key] = false;
        });

        const app = new App(document.getElementById('canvas1'));
        app.background_color = [1.0, 1.0, 1.0, 1.0];

        app.camera.position = vec3.fromValues(0, -10, 10);
        app.camera.target = vec3.fromValues(0, 0, 0);

        app.on_update = (dt, t) => {
            if (pressedKeys['w']) camOffset_Y += 0.25;
            if (pressedKeys['s']) camOffset_Y -= 0.25;
            if (pressedKeys['a']) camOffset_X -= 0.25;
            if (pressedKeys['d']) camOffset_X += 0.25;

            var newCamPosition = vec3.clone(camStart);
            var newCamTarget = vec3.clone(camStartTarget);
            vec3.add(newCamPosition, newCamPosition, vec3.fromValues(camOffset_X, camOffset_Y, camOffset_Z));
            vec3.add(newCamTarget, newCamTarget, vec3.fromValues(camOffset_X, camOffset_Y, camOffset_Z));

        app.camera.position = newCamPosition;
        app.camera.target = newCamTarget;
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
        torus.scale = vec3.fromValues(10, 10, 5);

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
        sphere1.position = vec3.fromValues(5, 10, -3);
        sphere1.scale = vec3.fromValues(6, 6, 6);

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
        sphere2.position = vec3.fromValues(-2, 10, 2);
        sphere2.scale = vec3.fromValues(6, 6, 6);

        app.run();
    }
};