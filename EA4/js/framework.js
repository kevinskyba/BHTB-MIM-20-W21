
class Model {
    constructor(type, vs_src, fs_src) {
        this._type = type;
        this._vs_src = vs_src;
        this._fs_src = fs_src;
        this.on_update = (dt, t) => {};
    }

    set indices(data) {
        // Set indicies
        this._GL_CONTEXT.bindBuffer(this._GL_CONTEXT.ELEMENT_ARRAY_BUFFER, this._ibo);
        this._GL_CONTEXT.bufferData(this._GL_CONTEXT.ELEMENT_ARRAY_BUFFER, data, this._GL_CONTEXT.STATIC_DRAW);
        this._ibo.numberOfElements = data.length;
    }

    set vertex_positions(data) {
        this._GL_CONTEXT.bindBuffer(this._GL_CONTEXT.ARRAY_BUFFER, this._vbo_pos);
        this._GL_CONTEXT.bufferData(this._GL_CONTEXT.ARRAY_BUFFER, data, this._GL_CONTEXT.STATIC_DRAW);
        this._GL_CONTEXT.vertexAttribPointer(this._coord_attr, 3, this._GL_CONTEXT.FLOAT, false, 0, 0);
    }

    set vertex_colors(data) {
        this._GL_CONTEXT.bindBuffer(this._GL_CONTEXT.ARRAY_BUFFER, this._vbo_col);
        this._GL_CONTEXT.bufferData(this._GL_CONTEXT.ARRAY_BUFFER, data, this._GL_CONTEXT.STATIC_DRAW);
        this._GL_CONTEXT.vertexAttribPointer(this._color_attr, 4, this._GL_CONTEXT.FLOAT, false, 0, 0);
    }

    init_context(context) {
        this._GL_CONTEXT = context;

        this._vbo_pos = this._GL_CONTEXT.createBuffer();
        this._vbo_col = this._GL_CONTEXT.createBuffer();
        this._ibo = this._GL_CONTEXT.createBuffer();

        this._init_shaders();
    }

    _init_shaders() {
        /**
         * Load and set vertex shader
         */
        this._vertex_shader = this._GL_CONTEXT.createShader(this._GL_CONTEXT.VERTEX_SHADER);
        this._GL_CONTEXT.shaderSource(this._vertex_shader, this._vs_src);
        this._GL_CONTEXT.compileShader(this._vertex_shader);

        /**
         * Load and set fragment shader
         */
        this._fragment_shader = this._GL_CONTEXT.createShader(this._GL_CONTEXT.FRAGMENT_SHADER);
        this._GL_CONTEXT.shaderSource(this._fragment_shader, this._fs_src);
        this._GL_CONTEXT.compileShader(this._fragment_shader);

        this._shader_program = this._GL_CONTEXT.createProgram();
        this._GL_CONTEXT.attachShader(this._shader_program, this._vertex_shader);
        this._GL_CONTEXT.attachShader(this._shader_program, this._fragment_shader);
        this._GL_CONTEXT.linkProgram(this._shader_program);

        this._coord_attr = this._GL_CONTEXT.getAttribLocation(this._shader_program, "coordinates");
        this._color_attr = this._GL_CONTEXT.getAttribLocation(this._shader_program, "color");
    }

    update(dt, t) {
        this.on_update(dt, t);
    }

    render() {
        this._GL_CONTEXT.useProgram(this._shader_program);

        this._GL_CONTEXT.bindBuffer(this._GL_CONTEXT.ARRAY_BUFFER, this._vbo_pos);
        this._GL_CONTEXT.vertexAttribPointer(this._coord_attr, 3, this._GL_CONTEXT.FLOAT, false, 0, 0);
        this._GL_CONTEXT.enableVertexAttribArray(this._coord_attr);

        this._GL_CONTEXT.bindBuffer(this._GL_CONTEXT.ARRAY_BUFFER, this._vbo_col);
        this._GL_CONTEXT.vertexAttribPointer(this._color_attr, 4, this._GL_CONTEXT.FLOAT, false, 0, 0);
        this._GL_CONTEXT.enableVertexAttribArray(this._color_attr);

        this._GL_CONTEXT.bindBuffer(this._GL_CONTEXT.ELEMENT_ARRAY_BUFFER, this._ibo);

        if (this._type == "LINES")
            this._GL_CONTEXT.drawElements(this._GL_CONTEXT.LINES, this._ibo.numberOfElements, this._GL_CONTEXT.UNSIGNED_SHORT, 0);
        if (this._type == "TRIANGLES")
            this._GL_CONTEXT.drawElements(this._GL_CONTEXT.TRIANGLES, this._ibo.numberOfElements, this._GL_CONTEXT.UNSIGNED_SHORT, 0);
    }
}

class App {
    constructor(canvas) {
        this._CANVAS = canvas;
        this._models = [];
        this._last_timestamp = 0;

        this._init_canvas();
        this._init_gl();
    }

    _init_canvas() {
        this._CANVAS.width = 800; // set the canvas resolution
        this._CANVAS.height = 800;
        this._CANVAS.style.width = "800px"; // set the display size.
        this._CANVAS.style.height = "800px";
    }

    _init_gl() {
        this._GL_CONTEXT = this._CANVAS.getContext('experimental-webgl');
        this._GL_CONTEXT.enable(this._GL_CONTEXT.DEPTH_TEST);
        this._GL_CONTEXT.depthFunc(this._GL_CONTEXT.LEQUAL);
    }

    add_model(model) {
        model.init_context(this._GL_CONTEXT);
        this._models.push(model);
    }

    update(dt, t) {
        this._models.forEach(model => model.update(dt, t))
    }

    render(dt, t) {
        // Clear
        this._GL_CONTEXT.clearColor(0.0, 0.0, 0.0, 1.0);
        this._GL_CONTEXT.clear(this._GL_CONTEXT.COLOR_BUFFER_BIT | this._GL_CONTEXT.DEPTH_BUFFER_BIT);
        this._GL_CONTEXT.viewport(0, 0, this._CANVAS.width, this._CANVAS.height);

        this._models.forEach(model => model.render())
    }

    _loop(timestamp) {        
        var dt = (timestamp - this._last_timestamp) / 1000; // In seconds
        this._last_timestamp = timestamp;
        this.update(dt, timestamp / 1000);
        this.render(dt, timestamp / 1000);
        window.requestAnimationFrame(this._loop.bind(this));
    }

    run() {
        window.requestAnimationFrame(this._loop.bind(this));
    }
}