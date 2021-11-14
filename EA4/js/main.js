
window.onload = () => {

    {
        const app1 = new App(document.getElementById('canvas1'));

        var para1_surface = new Model("TRIANGLES", VERTEX_SHADER_SOURCE, FRAGMENT_SHADER_SOURCE);
        app1.add_model(para1_surface);

        para1_surface.on_update = (dt, t) => {
            var surface = surface_ei(dt, t);
            para1_surface.indices = surface[1];
            para1_surface.vertex_positions = surface[2];
            para1_surface.vertex_colors = surface[4];
        };

        app1.run();

        var para1_lines = new Model("LINES", VERTEX_SHADER_SOURCE, FRAGMENT_SHADER_SOURCE);
        app1.add_model(para1_lines);

        para1_lines.on_update = (dt, t) => {
            var surface = surface_ei(dt, t);
            para1_lines.indices = surface[0];
            para1_lines.vertex_positions = surface[2];
            para1_lines.vertex_colors = surface[3];
        };
    }
    {
        const app2 = new App(document.getElementById('canvas2'));

        var para2_surface = new Model("TRIANGLES", VERTEX_SHADER_SOURCE, FRAGMENT_SHADER_SOURCE);
        app2.add_model(para2_surface);

        para2_surface.on_update = (dt, t) => {
            var surface = surface_folium(dt, t);
            para2_surface.indices = surface[1];
            para2_surface.vertex_positions = surface[2];
            para2_surface.vertex_colors = surface[4];
        };

        var para2_lines = new Model("LINES", VERTEX_SHADER_SOURCE, FRAGMENT_SHADER_SOURCE);
        app2.add_model(para2_lines);

        para2_lines.on_update = (dt, t) => {
            var surface = surface_folium(dt, t);
            para2_lines.indices = surface[0];
            para2_lines.vertex_positions = surface[2];
            para2_lines.vertex_colors = surface[3];
        };
        app2.run();
    }
    {
        const app3 = new App(document.getElementById('canvas3'));

        var para3_surface = new Model("TRIANGLES", VERTEX_SHADER_SOURCE, FRAGMENT_SHADER_SOURCE);
        app3.add_model(para3_surface);

        para3_surface.on_update = (dt, t) => {
            var surface = surface_custom(dt, t);
            para3_surface.indices = surface[1];
            para3_surface.vertex_positions = surface[2];
            para3_surface.vertex_colors = surface[4];
        };

        var para3_lines = new Model("LINES", VERTEX_SHADER_SOURCE, FRAGMENT_SHADER_SOURCE);
        app3.add_model(para3_lines);

        para3_lines.on_update = (dt, t) => {
            var surface = surface_custom(dt, t);
            para3_lines.indices = surface[0];
            para3_lines.vertex_positions = surface[2];
            para3_lines.vertex_colors = surface[3];
        };
        app3.run();
    }
};