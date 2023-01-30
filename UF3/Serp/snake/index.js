/**
 * Classe que representa el joc de la serp (snake)
 * @class
 */

const board_border = 'black';
const board_background = "white";
const snake_col = 'lightblue';
const snake_border = 'darkblue';

let snake = [
    {x: 200, y: 200},
    {x: 190, y: 200},
    {x: 180, y: 200},
    {x: 170, y: 200},
    {x: 160, y: 200}
]
// Velocitat x
let dx = 10;
// Velocitat y
let dy = 0;

const snakeboard = document.getElementById("snakeboard");
const snakeboard_ctx = snakeboard.getContext("2d");

start();

document.addEventListener("keydown", input);

/**
 * Inicialitza els paràmetres del joc:
 * Serp al centre, direcció cap a la dreta, puntuació 0
 */

function start() {
    if (has_game_ended()) return;
    input_direction = false;
    setTimeout(function onTick() {
        clear();
        move_snake();
        drawSnake();
        start();
    }, 100)
}

/**
 * Neteja el canvas (pinta'l de blanc)
 */
function clear() {
    snakeboard_ctx.fillStyle = board_background;
    snakeboard_ctx.strokestyle = board_border;
    snakeboard_ctx.fillRect(0, 0, snakeboard.width, snakeboard.height);
    snakeboard_ctx.strokeRect(0, 0, snakeboard.width, snakeboard.height);
}


/**
 * Dibuixa la serp al canvas
 */
function drawSnake() {
    snake.forEach(drawSnakePart)
}

function drawSnakePart(snakePart) {

    snakeboard_ctx.fillStyle = snake_col;
    snakeboard_ctx.strokestyle = snake_border;
    snakeboard_ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
    snakeboard_ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
}



function has_game_ended() {
    for (let i = 4; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true
    }
    const hitLeftWall = snake[0].x < 0;
    const hitRightWall = snake[0].x > snakeboard.width - 10;
    const hitToptWall = snake[0].y < 0;
    const hitBottomWall = snake[0].y > snakeboard.height - 10;
    return hitLeftWall || hitRightWall || hitToptWall || hitBottomWall
}


/**
 * Actualitza la direcció de la serp a partir de l'event (tecla dreta, esquerra, amunt, avall)
 * @param {event} e - l'event de la tecla premuda
 */

function input(e) {
    const LEFT_KEY = 37;  // ->
    const RIGHT_KEY = 39; // <-
    const UP_KEY = 38; // /\
    const DOWN_KEY = 40; // \/

    if (input_direction) return;
    input_direction = true;
    const keyPressed = e.keyCode;
    const goingUp = dy === -10;
    const goingDown = dy === 10;
    const goingRight = dx === 10;
    const goingLeft = dx === -10;
    if (keyPressed === LEFT_KEY && !goingRight) {
        dx = -10;
        dy = 0;
    }
    if (keyPressed === UP_KEY && !goingDown) {
        dx = 0;
        dy = -10;
    }
    if (keyPressed === RIGHT_KEY && !goingLeft) {
        dx = 10;
        dy = 0;
    }
    if (keyPressed === DOWN_KEY && !goingUp) {
        dx = 0;
        dy = 10;
    }
}

function move_snake() {
    const head = {x: snake[0].x + dx, y: snake[0].y + dy};
    snake.unshift(head);
    snake.pop();
}