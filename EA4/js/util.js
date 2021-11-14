function RANDOM(min_max) {
    return Math.random() * (min_max[1] - min_max[0]) + min_max[0];
}

function RANDOM_INT(min_max) {
    return Math.floor(Math.random() * (min_max[1] - min_max[0])) + min_max[0];
}