function RANDOM(min_max) {
    return Math.random() * (min_max[1] - min_max[0]) + min_max[0];
}

function RANDOM_INT(min_max) {
    return Math.floor(Math.random() * (min_max[1] - min_max[0])) + min_max[0];
}

function FILL_COLOR(num_indices, color) {
    var colors_vertices = new Float32Array(4 * (num_indices + 1));
    
    for (var i = 0; i < num_indices; i++) {
        colors_vertices[i * 4] = color[0];
        colors_vertices[i * 4 + 1] = color[1];
        colors_vertices[i * 4 + 2] = color[2];
        colors_vertices[i * 4 + 3] = color[3];
    }

    return colors_vertices;
}