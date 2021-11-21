const VERTEX_SHADER_SOURCE = `
    attribute vec3 coordinates;

    uniform mat4 projmatrix;
    uniform mat4 viewmatrix;
    uniform mat4 modelmatrix;

    attribute vec4 color;
    varying vec4 vColor;

    void main() {
        gl_Position = projmatrix * viewmatrix * modelmatrix * vec4(coordinates, 1.0);
        vColor = color;
    }
`;