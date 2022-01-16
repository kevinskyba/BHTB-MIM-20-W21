
const vec3 = glMatrix.vec3;

const camStart = vec3.fromValues(0, -10, 10);
const camStartTarget = vec3.fromValues(0, 0, 0);

var pressedKeys = {};

let cubeMin = -5;
let cubeMax = 5;

const COLOR_GREEN = [0.0, 1.0, 0.0, 1.0];
const COLOR_RED = [1.0, 0.0, 0.0, 1.0];

let paramsChanged = true; // Run setup initially

let N = 25;
var Nslider = document.getElementById('Nslider');
Nslider.onchange = (evt) => {
    N = parseInt(Nslider.value);
    paramsChanged = true;
};
Nslider.value = N;

let R = 3;
var Rslider = document.getElementById('Rslider');
Rslider.onchange = (evt) => {
    R = parseInt(Rslider.value);
    paramsChanged = true;
};
Rslider.value = R;

let K = 20;
var Kslider = document.getElementById('Kslider');
Kslider.onchange = (evt) => {
    K = parseInt(Kslider.value);
    paramsChanged = true;
};
Kslider.value = K;

let Z = 2;
var Zslider = document.getElementById('Zslider');
Zslider.onchange = (evt) => {
    Z = parseInt(Zslider.value);
    paramsChanged = true;
};
Zslider.value = Z;

class Ball {
    constructor(app) {
        this.model = new Model(VERTEX_SHADER_SOURCE, FRAGMENT_SHADER_SOURCE);
        app.add_model(this.model);

        this.sphere_data = sphere_createVertexData();
        this.model.indices = this.sphere_data["indicesTriangles"];
        this.model.vertex_normals = this.sphere_data["normals"];
        this.model.vertex_positions = this.sphere_data["vertices"];

        this.infected_time = 0;
        this.infected = false;

        this.velocity = vec3.fromValues(0, 0, 0);
    }

    set infected(inf) {
        this._infected = inf;
        this.infected_time = Z;

        if (inf) {
            this.model.vertex_colors = FILL_COLOR(this.sphere_data["vertices"].length, COLOR_RED);
        } else {
            this.model.vertex_colors = FILL_COLOR(this.sphere_data["vertices"].length, COLOR_GREEN);
        }
    }

    update(dt, t) {
        if (this._infected && this.infected_time < 0) {
            this.infected = false;
        }
        this.infected_time -= dt;

        let newPosition = vec3.clone(this.model._position);
        vec3.add(newPosition, newPosition, vec3.fromValues(
            this.velocity[0] * dt,
            this.velocity[1] * dt, 
            this.velocity[2] * dt));

        if (newPosition[0] > cubeMax) {
            newPosition[0] = cubeMin;
        }
        else if (newPosition[0] < cubeMin) {
            newPosition[0] = cubeMax;
        }

        if (newPosition[1] > cubeMax) {
            newPosition[1] = cubeMin;
        }
        else if (newPosition[1] < cubeMin) {
            newPosition[1] = cubeMax;
        }

        if (newPosition[2] > cubeMax) {
            newPosition[2] = cubeMin;
        }
        else if (newPosition[2] < cubeMin) {
            newPosition[2] = cubeMax;
        }

        this.model.position = newPosition;
    }
}

window.onload = () => {
    {
        var balls = [];

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

            balls.forEach((ball) => {
                ball.update(dt, t);
            });

            if (paramsChanged) {
                paramsChanged = false;
                balls = [];
                app.reset();
                
                for (var i = 0; i < N; i++) {
                    let ball = new Ball(app);
                    ball.model.position = vec3.fromValues(
                        RANDOM([cubeMin, cubeMax]),
                        RANDOM([cubeMin, cubeMax]),
                        RANDOM([cubeMin, cubeMax])
                    );

                    ball.velocity = vec3.fromValues(
                        RANDOM([-1, 1]),
                        RANDOM([-1, 1]),
                        RANDOM([-1, 1])
                    );

                    let scale = R / 100.0 * (cubeMax - cubeMin);
                    ball.model.scale = vec3.fromValues(scale, scale, scale);
                    ball.infected = i < (K/100) * N;

                    balls.push(ball);
                }
            }
        };

        app.run();
    }
};