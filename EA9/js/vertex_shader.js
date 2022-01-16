const VERTEX_SHADER_SOURCE = `
    attribute vec3 coordinates;
    attribute vec3 normals;

    attribute vec2 texturecoord;
    varying vec2 vTextureCoord;

    uniform mat4 projmatrix;
    uniform mat4 viewmatrix;
    uniform mat4 modelmatrix;

    attribute vec4 color;
    varying vec4 vColor;

    void main() {
        gl_Position = projmatrix * viewmatrix * modelmatrix * vec4(coordinates, 1.0);
        vColor = color * (vec4(normals.z, normals.z, normals.z, 1.0) + 1.0) / 2.0;
        vTextureCoord = texturecoord;
    }
`;