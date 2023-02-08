
function drawarcrainbow() {  // Funcion draw "dibujar" arco de colores

    var context = canvas.getContext("2d"), bars = 20, i, radius = 140;
    context.lineWidth = 6; // Ancho de la linea
    // Colores arcoiris: Red, orange, yellow, green, blue, indigo, violet.
    // Array de colores
    var colors = ["red", "orange", "yellow", "green", "blue", "indigo", "violet", "white"];
    for (i = 0; i < bars; i++, radius -= context.lineWidth - 1) {
        context.beginPath();
        // ctx.arc(100, 75, 50, 0, 2 * Math.PI);
        context.arc(canvas.width * 0.5, canvas.height, radius, 0, Math.PI, true);
        context.strokeStyle = colors[i]; // Estilo array de colores
        context.stroke();
    }
}

drawarcrainbow()