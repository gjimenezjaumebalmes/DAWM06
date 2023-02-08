function circle() { // funcion circulo
    canvas  = document.getElementById("canvas");
    context = canvas.getContext("2d");

    var numCircles = 10; // Numero de circulos
    var colors     = ["#DCDCDC",  "#D3D3D3", "#C0C0C0",  "#A9A9A9", "#808080", "#696969"]; // array colores grises
    var numColors  =  colors.length;

    for(var n=0; n<numCircles; n++)
    {
        var xPos       =  Math.random()*canvas.width; // Posicion aleatoria x
        var yPos       =  Math.random()*canvas.height; // Posicion aleatoria y
        var radius     = 50; // radio de los circulos
        var colorIndex =  Math.random()*(numColors-1); // Color aleatorio
        colorIndex     =  Math.round(colorIndex);

        var color      =  colors[colorIndex];

        drawCircle(context, xPos, yPos, radius, color);
    }
};


function drawCircle(context, xPos, yPos, radius, color) { // Funcion dibujar circulos

    var startAngle = (Math.PI/180)*0;
    var endAngle   = (Math.PI/180)*360;

    context.beginPath();
    context.arc(xPos, yPos, radius, startAngle, endAngle, false);
    context.fillStyle = color;
    context.fill();
}

circle()
