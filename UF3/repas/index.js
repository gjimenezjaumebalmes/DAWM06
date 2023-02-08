
function repas () {
    let canvas = document.getElementById("canvas");
    let context = canvas.getContext("2d");

    const borde = "black";
    const fondo = "white";

    context.strokeStyle = borde;
    context.fillStyle = fondo;
    context.lineWidth = 5; // grosor de linea del canvas

    context.fillRect(0, 0, canvas.height, canvas.width);
    context.strokeRect(0, 0, canvas.height, canvas.width);
}

repas()
