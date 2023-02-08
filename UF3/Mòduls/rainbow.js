
function drawarcrainbow() {  // Funcion draw "dibujar" arco de colores

    var ctx = c.getContext("2d"), bars = 20, i = 0, radius = 140;
    ctx.lineWidth = 6; // Ancho de la linea
    // Colores arcoiris: Red, orange, yellow, green, blue, indigo, violet.
    // Array de colores
    var colors = ["red", "orange", "yellow", "green", "blue", "indigo", "violet", "white"];
    for (i = 0; i < bars; i++, radius -= ctx.lineWidth - 1) {
        ctx.beginPath();
        // ctx.arc(100, 75, 50, 0, 2 * Math.PI);
        ctx.arc(c.width * 0.5, c.height, radius, 0, Math.PI, true);
        ctx.strokeStyle = colors[i]; // Estilo array de colores
        ctx.stroke();
    }
}

drawarcrainbow()