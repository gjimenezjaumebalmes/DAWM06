    tablero_borde = 'black';
    tablero_fondo = "white";
    snake_fondo = 'red';
    snake_border = 'black';

    snake = [{x: 200, y: 200},]; // dibujar serpiente
    // Velocitat x
    let velocidad_x = 10;
    // Velocitat y
    let velocidad_y = 0;

    let food_x; // variable x de la comida
    let food_y; // variable y de la comida

    let score = 0;  // Puntuacion

    tablero = document.getElementById("tablero");
    tablero_x = tablero.getContext("2d");
    // "2d", lo que lleva a la creación de un objeto CanvasRenderingContext2D
    // que representa un contexto de representación bidimensional.


    /**
    * Inicialitza els paràmetres del joc:
    * Serp al centre, direcció cap a la dreta, puntuació 0
    */


    /**
    * Afegeix un menjar a una posició aleatòria, la posició no ha de ser cap de les de la serp
    */
    function start() {
    if (fin()) return;
    input_direction = false;

    setTimeout(function onTick() {
    // El método setTimeout() permite ejecutar un fragmento de código, una vez transcurrido un tiempo determinado.
    start();
    clear();
    move_snake();
    drawSnake();
    drawFood();
    }, 100) //Velocidad de la serpiente
    }

    start();
    addFood();

    /**
    * Neteja el canvas (pinta'l de blanc)
    */

    // Funcion limpiar tablero
    function clear() {
    tablero_x.fillStyle = tablero_fondo;
    tablero_x.strokestyle = tablero_borde;
    // tablero_x.fillRect(x,y,w,h);
    tablero_x.fillRect(0, 0, tablero.width, tablero.height);
    tablero_x.strokeRect(0, 0, tablero.width, tablero.height);
    }


    /**
    * Dibuixa la serp al canvas
    */
    function drawSnake() {
    snake.forEach(AddPartSnake)
    // El método forEach() ejecuta la función indicada una vez por cada elemento del array.
    }

    // Funcion partes de la serpiente
    function AddPartSnake(snakePart) {

    tablero_x.fillStyle = snake_fondo;
    tablero_x.strokestyle = snake_border;
    tablero_x.fillRect(snakePart.x, snakePart.y, 10, 10);
    // fillRect Dibuja un rectángulo relleno en la posición ( x, y ).
    tablero_x.strokeRect(snakePart.x, snakePart.y, 10, 10);
    // El strokeRect() método dibuja un rectángulo (no fill) .

    }

    /**
    * Dibuixa la poma al canvas
    */
    // Funcion dibujar comida
    function drawFood() {
    tablero_x.fillStyle = 'blue';  // color de la comida
    tablero_x.strokestyle = 'black'; // color del borde de la comida
    tablero_x.fillRect(food_x, food_y, 10, 10);
    // fillRect Dibuja un rectángulo relleno en la posición ( x, y ).
    tablero_x.strokeRect(food_x, food_y, 10, 10);
    // El strokeRect() método dibuja un rectángulo (no fill) .
}

    // Funcion fin de juego
    function fin() {
    for (let i = 4; i < snake.length; i++) {
    const golpe = snake[i].x === snake[0].x && snake[i].y === snake[0].y
    if (golpe)
    return true
}
}


    /**
    * Actualitza la direcció de la serp a partir de l'event (tecla dreta, esquerra, amunt, avall)
    * @param {event} e - l'event de la tecla premuda
    */

    function input(e) {
    let LEFT_KEY = 37;  // ->   DERECHA TECLAS ASCII 37
    let RIGHT_KEY = 39; // <-   IZQUIERDA ASCII 39
    let UP_KEY = 38; // /\      ARRIBA ASCII 38
    let DOWN_KEY = 40; // \/    ABAJO ASCII 40

    if (input_direction) return;

    input_direction = true;

    let Up = velocidad_y === -10;   // up
    let Down = velocidad_y === 10; // down
    let Right = velocidad_x === 10; // right
    let Left = velocidad_x === -10;  // left

    let CLICK = e.keyCode;

    switch (e.keyCode) {
    case 37:
    if (CLICK === LEFT_KEY && !Right) {
    velocidad_x = -10;
    velocidad_y = 0;
}
    break;
    case 38:
    if (CLICK === UP_KEY && !Down) {
    velocidad_x = 0;
    velocidad_y = -10;
}
    break;
    case 39:
    if (CLICK === RIGHT_KEY && !Left) {
    velocidad_x = 10;
    velocidad_y = 0;
}
    break;
    case 40:
    if (CLICK === DOWN_KEY && !Up) {
    velocidad_x = 0;
    velocidad_y = 10;
}
    break;
}
}

    document.addEventListener("keydown", input);

    // Funcion movimiento snake
    function move_snake() {
    const head = {x: snake[0].x + velocidad_x, y: snake[0].y + velocidad_y};
    snake.unshift(head);
    // Metodo Unshift(): El método agrega el nuevo elemento pasado como parámetro
    // al comienzo del arreglo cambiando por tanto su longitud y luego devuelve la misma.
    const comer_food = snake[0].x === food_x && snake[0].y === food_y;

    if (comer_food) {
    drawPuntuacion();
    addFood(); // Añadimos otra comida con la funcion addFood
} else {
    snake.pop();
    // Metodo Pop(): Este método elimina el último elemento de un arreglo
    // y luego devuelve dicho elemento como respuesta.

}
}

    // Funcion comida random
    function random_food(min, max) {
    return Math.round((Math.random() * (max-min) + min) / 10) * 10;
        // La función Math.random() genera un numero aleatorio.
        // La función Math.round()retorna el valor de un número redondeado al entero más cercano.
}

    // Funcion añadir comida
    function addFood() {
        food_x = random_food()
    food_x = random_food(0, tablero.width - 10);
    food_y = random_food(0, tablero.height - 10);
    snake.forEach(function snake_food(part) {
    // El método forEach() ejecuta la función indicada una vez por cada elemento del array.
    const comer = part.x === food_x && part.y === food_y;
    if (comer) addFood();
});
}

    // Funcion dibujar puntuacion
    function drawPuntuacion(){
    score += 1; // Aumentamos 1 Puntuacion cada vez que come una food
    document.getElementById('score').innerHTML = score;
}

//     function lost () {
//     alert("Has PERDIDO")
// }
