const VERTEX_SHADER_SOURCE = `
    attribute vec3 coordinates;

    void main() {
        gl_Position = vec4(coordinates, 1.0);
    }

`;