const VERTEX_SHADER_SOURCE = `
    attribute vec3 coordinates;
    attribute vec4 color;

    varying vec4 vColor;

    void main() {
        gl_Position = vec4(coordinates, 1.0);
        vColor = color;
    }

`;