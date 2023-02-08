

    canvas = document.getElementById("canvas");
    let context = canvas.getContext("2d");
    const borde = "green";
    const fondo = "white";
    ctx.strokeStyle = borde;
    ctx.fillStyle = fondo;
    ctx.fillRect(100, 20, 160, 100);
    ctx.strokeRect(100, 20, 160, 100);

