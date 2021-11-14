
function surface_ei(dt, t) {
    const zoom_factor = 1;
    const a = 1, b = 2 + 0.8 * Math.sin(2*t), c = Math.cos(t);
    const n_u = 32, n_v = 32;

    const u_max = a, u_min = 0;
    const v_max = 2 * Math.PI, v_min = 0;

    const d_u = (u_max - u_min) / n_u;
    const d_v = (v_max - v_min) / n_v;

    var n = (n_u + 1) * (n_v + 1);
    var vertices = new Float32Array(3 * (n + 1));

    var colors_lines = new Float32Array(4 * (n + 1));
    var colors_vertices = new Float32Array(4 * (n + 1));

    var idx = 0;
    for (var i = 0; i <= n_u; i++) {
        for (var j = 0; j <= n_v; j++) {
            var u = u_min + i * d_u;
            var v = v_min + j * d_v;

            var x = c * Math.sqrt(u * (u - a) * (u - b)) * Math.sin(v);
            var y = u;
            var z = c * Math.sqrt(u * (u - a) * (u - b)) * Math.cos(v);

            vertices[idx * 3] = x * zoom_factor;
            vertices[idx * 3 + 1] = y * zoom_factor - zoom_factor / 2;
            vertices[idx * 3 + 2] = z * zoom_factor;

            colors_lines[idx * 4] = 0.2;
            colors_lines[idx * 4 + 1] = 0.6;
            colors_lines[idx * 4 + 2] = 1.0;
            colors_lines[idx * 4 + 3] = 1.0;

            colors_vertices[idx * 4] = u * Math.cos(t);
            colors_vertices[idx * 4 + 1] = v * Math.cos(t);
            colors_vertices[idx * 4 + 2] = 1.0;
            colors_vertices[idx * 4 + 3] = 1.0;

            idx++;
        }
    }

    var line_indices = new Uint16Array(2 * (n_u * (n_v + 1) + n_v * (n_u + 1)));
    idx = 0;
    for (var i = 0; i <= n_u; i++) {
        for (var j = 0; j < n_v; j++) {
            line_indices[idx] = i * (n_v + 1) + j;
            line_indices[idx + 1] = i * (n_v + 1) + j + 1;
            idx += 2;
        }
    }
    for (var j = 0; j <= n_v; j++) {
        for (var i = 0; i < n_u; i++) {
            line_indices[idx] = i * (n_v + 1) + j;
            line_indices[idx + 1] = (i + 1) * (n_v + 1) + j;
            idx += 2;
        }
    }

    var triangle_indices = new Uint16Array(6 * n_u * n_v);
    idx = 0;
    for (var j = 0; j < n_v; j++) {
        for (var i = 0; i < n_u; i++) {
            var p1 = i * (n_v + 1) + j;
            var p2 = i * (n_v + 1) + j + 1;
            var p3 = (i + 1) * (n_v + 1) + j + 1;
            var p4 = (i + 1) * (n_v + 1) + j;

            triangle_indices[idx] = p1;
            triangle_indices[idx+1] = p2;
            triangle_indices[idx+2] = p3;
            triangle_indices[idx+3] = p3;
            triangle_indices[idx+4] = p4;
            triangle_indices[idx+5] = p1;
            idx += 6;
        }
    }

    return [line_indices, triangle_indices, vertices, colors_lines, colors_vertices];
}

function surface_folium(dt, t) {
    const zoom_factor = 0.9;
    const n_u = 64, n_v = 64;

    const u_max = Math.PI, u_min = -Math.PI;
    const v_max = Math.PI, v_min = -Math.PI;

    const d_u = (u_max - u_min) / n_u;
    const d_v = (v_max - v_min) / n_v;

    var n = (n_u + 1) * (n_v + 1);
    var vertices = new Float32Array(3 * (n + 1));

    var colors_lines = new Float32Array(4 * (n + 1));
    var colors_vertices = new Float32Array(4 * (n + 1));

    var idx = 0;
    for (var i = 0; i <= n_u; i++) {
        for (var j = 0; j <= n_v; j++) {
            var u = u_min + i * d_u;
            var v = v_min + j * d_v;

            var x = Math.cos(u) * (2 * v / Math.PI - Math.tanh(v));
            var y = Math.cos(u + 2 * Math.PI / 3) / Math.cosh(v);
            var z = Math.cos(u - 2 * Math.PI / 3) / Math.cosh(v);

            vertices[idx * 3] = x * zoom_factor;
            vertices[idx * 3 + 1] = y * zoom_factor;
            vertices[idx * 3 + 2] = z * zoom_factor;

            colors_lines[idx * 4] = 0.2;
            colors_lines[idx * 4 + 1] = 0.6;
            colors_lines[idx * 4 + 2] = 1.0;
            colors_lines[idx * 4 + 3] = 1.0;

            colors_vertices[idx * 4] = u * Math.sin(3*t);
            colors_vertices[idx * 4 + 1] = v * Math.sin(2*t);
            colors_vertices[idx * 4 + 2] = 1.0;
            colors_vertices[idx * 4 + 3] = 1.0;

            idx++;
        }
    }

    var line_indices = new Uint16Array(2 * (n_u * (n_v + 1) + n_v * (n_u + 1)));

    idx = 0;
    for (var i = 0; i <= n_u; i++) {
        for (var j = 0; j < n_v; j++) {
            line_indices[idx] = i * (n_v + 1) + j;
            line_indices[idx + 1] = i * (n_v + 1) + j + 1;
            idx += 2;
        }
    }
    for (var j = 0; j <= n_v; j++) {
        for (var i = 0; i < n_u; i++) {
            line_indices[idx] = i * (n_v + 1) + j;
            line_indices[idx + 1] = (i + 1) * (n_v + 1) + j;
            idx += 2;
        }
    }

    var triangle_indices = new Uint16Array(6 * n_u * n_v);
    idx = 0;
    for (var j = 0; j < n_v; j++) {
        for (var i = 0; i < n_u; i++) {
            var p1 = i * (n_v + 1) + j;
            var p2 = i * (n_v + 1) + j + 1;
            var p3 = (i + 1) * (n_v + 1) + j + 1;
            var p4 = (i + 1) * (n_v + 1) + j;

            triangle_indices[idx] = p1;
            triangle_indices[idx+1] = p2;
            triangle_indices[idx+2] = p3;
            triangle_indices[idx+3] = p3;
            triangle_indices[idx+4] = p4;
            triangle_indices[idx+5] = p1;
            idx += 6;
        }
    }

    return [line_indices, triangle_indices, vertices, colors_lines, colors_vertices];
}


function surface_custom(dt, t) {
    const zoom_factor = 0.5;
    const n_u = 64, n_v = 64;

    const u_max = Math.PI, u_min = -Math.PI;
    const v_max = Math.PI, v_min = -Math.PI;

    const d_u = (u_max - u_min) / n_u;
    const d_v = (v_max - v_min) / n_v;

    var n = (n_u + 1) * (n_v + 1);
    var vertices = new Float32Array(3 * (n + 1));

    var colors_lines = new Float32Array(4 * (n + 1));
    var colors_vertices = new Float32Array(4 * (n + 1));

    var idx = 0;
    for (var i = 0; i <= n_u; i++) {
        for (var j = 0; j <= n_v; j++) {
            var u = u_min + i * d_u;
            var v = v_min + j * d_v;

            var x = -Math.tanh(-v) + Math.sin(u * Math.sin(t));
            var y = Math.tanh(-u) + Math.sin(v * Math.sin(t));
            var z = Math.tanh(-u) + Math.sin(v);

            vertices[idx * 3] = x * zoom_factor;
            vertices[idx * 3 + 1] = y * zoom_factor;
            vertices[idx * 3 + 2] = z * zoom_factor;

            colors_lines[idx * 4] = 0.2;
            colors_lines[idx * 4 + 1] = 0.6;
            colors_lines[idx * 4 + 2] = 1.0;
            colors_lines[idx * 4 + 3] = 1.0;

            colors_vertices[idx * 4] = u * Math.sin(t);
            colors_vertices[idx * 4 + 1] = v * Math.sin(t);
            colors_vertices[idx * 4 + 2] = 1.0;
            colors_vertices[idx * 4 + 3] = 1.0;

            idx++;
        }
    }

    var line_indices = new Uint16Array(2 * (n_u * (n_v + 1) + n_v * (n_u + 1)));

    idx = 0;
    for (var i = 0; i <= n_u; i++) {
        for (var j = 0; j < n_v; j++) {
            line_indices[idx] = i * (n_v + 1) + j;
            line_indices[idx + 1] = i * (n_v + 1) + j + 1;
            idx += 2;
        }
    }
    for (var j = 0; j <= n_v; j++) {
        for (var i = 0; i < n_u; i++) {
            line_indices[idx] = i * (n_v + 1) + j;
            line_indices[idx + 1] = (i + 1) * (n_v + 1) + j;
            idx += 2;
        }
    }

    var triangle_indices = new Uint16Array(6 * n_u * n_v);
    idx = 0;
    for (var j = 0; j < n_v; j++) {
        for (var i = 0; i < n_u; i++) {
            var p1 = i * (n_v + 1) + j;
            var p2 = i * (n_v + 1) + j + 1;
            var p3 = (i + 1) * (n_v + 1) + j + 1;
            var p4 = (i + 1) * (n_v + 1) + j;

            triangle_indices[idx] = p1;
            triangle_indices[idx+1] = p2;
            triangle_indices[idx+2] = p3;
            triangle_indices[idx+3] = p3;
            triangle_indices[idx+4] = p4;
            triangle_indices[idx+5] = p1;
            idx += 6;
        }
    }

    return [line_indices, triangle_indices, vertices, colors_lines, colors_vertices];
}