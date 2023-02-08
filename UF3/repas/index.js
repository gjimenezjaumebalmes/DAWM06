
function repas () {
    let canvas = document.getElementById("canvas");
    let context = canvas.getContext("2d");

    const borde = "green";
    const fondo = "white";

    context.strokeStyle = borde;
    context.fillStyle = fondo;

    context.fillRect(100, 20, canvas.height, canvas.width);
    context.strokeRect(100, 20, 160, 100);
}

repas()
