
const vec3 = glMatrix.vec3;

const camStart = vec3.fromValues(0, -15, 15);
const camStartTarget = vec3.fromValues(0, 0, 0);

var pressedKeys = {};

function toBase64(arr) {
    //arr = new Uint8Array(arr) if it's an ArrayBuffer
    return btoa(
       arr.reduce((data, byte) => data + String.fromCharCode(byte), '')
    );
 }

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

        app.camera.position = vec3.fromValues(0, -15, 15);
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
        // Create torus
        {
            var torus_data = torus_createVertexData();
            torus.indices = torus_data["indicesTriangles"];
            torus.vertex_normals = torus_data["normals"];
            torus.vertex_positions = torus_data["vertices"];
            torus.texture_coords = torus_data["uv"];
            torus.vertex_colors = FILL_COLOR(torus_data["vertices"].length, [1.0, 1.0, 0.0, 1.0]);
            torus.texture_path = "img/ring.png";
        };
        torus.position = vec3.fromValues(-8, 0, 0);
        torus.scale = vec3.fromValues(8, 8, 4);

        var torus2 = new Model(VERTEX_SHADER_SOURCE, FRAGMENT_SHADER_SOURCE);
        app.add_model(torus2);
        // Create torus
        {
            var torus_data = torus_createVertexData();
            torus2.indices = torus_data["indicesTriangles"];
            torus2.vertex_normals = torus_data["normals"];
            torus2.vertex_positions = torus_data["vertices"];
            torus2.texture_coords = torus_data["uv"];
            torus2.vertex_colors = FILL_COLOR(torus_data["vertices"].length, [1.0, 1.0, 0.0, 1.0]);

            let helperCanvas = document.getElementById('canvas2');
            helperCanvas.width = 256;
            helperCanvas.height = 256;
            let ctx = helperCanvas.getContext("2d");
            let data = ctx.createImageData(256, 256);
            for (let x = 0; x < 256; x++) {
                for (let y = 0; y < 256; y++){
                    let idx = 4*(x+y*256);
                    let v = parseInt(perlin.get(0.1 * x, 0.1 * y)*4096);
                    data.data[idx+0] = v;
                    data.data[idx+1] = v;
                    data.data[idx+2] = v;
                    data.data[idx+3] = 255;
                }
            }
            ctx.putImageData(data, 0, 0);

            console.log(helperCanvas.toDataURL());

            torus2.texture_path = helperCanvas.toDataURL();
        };
        torus2.position = vec3.fromValues(8, 0, 0);
        torus2.scale = vec3.fromValues(8, 8, 4);

        app.run();
    }
};