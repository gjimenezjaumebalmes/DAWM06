/**
 * Classe que representa el joc de la serp (snake)
 * @class
 */

const tablero_border = 'black';
const tablero_background = "white";
const snake_fondo = 'red';
const snake_border = 'black';

let snake = [
    {x: 200, y: 200},
    {x: 190, y: 200},
    {x: 180, y: 200},
    {x: 170, y: 200},
    {x: 160, y: 200}
]
// Velocitat x
let velocidad_x = 10;
// Velocitat y
let velocidad_y = 0;

let food_x; // variable x de la comida
let food_y; // variable y de la comida

const tablero = document.getElementById("tablero");
const tablero_x = tablero.getContext("2d");

start();

document.addEventListener("keydown", input);

/**
 * Inicialitza els paràmetres del joc:
 * Serp al centre, direcció cap a la dreta, puntuació 0
 */


/**
 * Afegeix un menjar a una posició aleatòria, la posició no ha de ser cap de les de la serp
 */
addFood();

function start() {
    if (fin()) return;
    input_direction = false;
    setTimeout(function onTick() {
        clear();
        move_snake();
        drawSnake();
        start();
        drawFood();
    }, 100)
}

/**
 * Neteja el canvas (pinta'l de blanc)
 */

// Funcion limpiar tablero
function clear() {
    tablero_x.fillStyle = tablero_background;
    tablero_x.strokestyle = tablero_border;
    tablero_x.fillRect(0, 0, tablero.width, tablero.height);
    tablero_x.strokeRect(0, 0, tablero.width, tablero.height);
}


/**
 * Dibuixa la serp al canvas
 */
function drawSnake() {
    snake.forEach(drawSnakePart)
}

// Funcion partes de la serpiente
function drawSnakePart(snakePart) {
    tablero_x.fillStyle = snake_fondo;
    tablero_x.strokestyle = snake_border;
    tablero_x.fillRect(snakePart.x, snakePart.y, 10, 10);
    tablero_x.strokeRect(snakePart.x, snakePart.y, 10, 10);
}

/**
 * Dibuixa la poma al canvas
 */
// Funcion dibujar comida
function drawFood() {
    tablero_x.fillStyle = 'blue';  // color de la comida
    tablero_x.strokestyle = 'black'; // color del borde de la comida
    tablero_x.fillRect(food_x, food_y, 10, 10);
    tablero_x.strokeRect(food_x, food_y, 10, 10);
}

// Funcion fin de juego
function fin() {
    for (let i = 4; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true
    }
    const LeftWall = snake[0].x < 0;
    const RightWall = snake[0].x > tablero.width - 10;
    const ToptWall = snake[0].y < 0;
    const BottomWall = snake[0].y > tablero.height - 10;
    return LeftWall || RightWall || ToptWall || BottomWall
}


/**
 * Actualitza la direcció de la serp a partir de l'event (tecla dreta, esquerra, amunt, avall)
 * @param {event} e - l'event de la tecla premuda
 */

function input(e) {
    const LEFT_KEY = 37;  // ->   DERECHA TECLAS ASCII 37
    const RIGHT_KEY = 39; // <-   IZQUIERDA ASCII 39
    const UP_KEY = 38; // /\      ARRIBA ASCII 38
    const DOWN_KEY = 40; // \/    ABAJO ASCII 40

    if (input_direction) return;
    input_direction = true;
    const CLICK = e.keyCode;
    const Up = velocidad_y === -10;   // constant up
    const Down = velocidad_y === 10; // constant down
    const Right = velocidad_x === 10; // constant right
    const Left = velocidad_x === -10;  // constant left
    if (CLICK === LEFT_KEY && !Right) {
        velocidad_x = -10;
        velocidad_y = 0;
    }
    if (CLICK === UP_KEY && !Down) {
        velocidad_x = 0;
        velocidad_y = -10;
    }
    if (CLICK === RIGHT_KEY && !Left) {
        velocidad_x = 10;
        velocidad_y = 0;
    }
    if (CLICK === DOWN_KEY && !Up) {
        velocidad_x = 0;
        velocidad_y = 10;
    }
}

// Funcion movimiento snake
function move_snake() {
    const head = {x: snake[0].x + velocidad_x, y: snake[0].y + velocidad_y};
    snake.unshift(head);
    const comer_food = snake[0].x === food_x && snake[0].y === food_y;
    if (comer_food) {
        addFood();
    } else {
        snake.pop();
    }
}

// Funcion comida random
function random_food(min, max) {
    return Math.round((Math.random() * (max-min) + min) / 10) * 10;
}

// Funcion añadir comida
function addFood() {
    food_x = random_food(0, tablero.width - 10);
    food_y = random_food(0, tablero.height - 10);
    snake.forEach(function snake_food(part) {
        const comer = part.x == food_x && part.y == food_y;
        if (comer) addFood();
    });
}


