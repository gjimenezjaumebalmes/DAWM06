function circle() { // funcion circulo
    let canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");

    let numCircles = 10; // Numero de circulos
    let colors = ["#DCDCDC", "#D3D3D3", "#C0C0C0", "#A9A9A9", "#808080", "#696969"]; // array colores grises
    let numColors = colors.length;

    for(let n=0; n<numCircles; n++)
    {
        let xPos = Math.random() * canvas.width; // Posicion aleatoria x
        let yPos = Math.random() * canvas.height; // Posicion aleatoria y
        let radius = 50; // radio de los circulos
        let colorIndex = Math.random() * (numColors - 1); // Color aleatorio
        colorIndex =  Math.round(colorIndex);

        let color = colors[colorIndex];

        drawCircle(context, xPos, yPos, radius, color);
    }
}


function drawCircle(context, xPos, yPos, radius, color) { // Funcion dibujar circulos

    let startAngle = 0;
    let endAngle = (Math.PI / 180) * 360;

    context.beginPath();
    context.arc(xPos, yPos, radius, startAngle, endAngle, false);
    context.fillStyle = color;
    context.fill();
}

circle()
