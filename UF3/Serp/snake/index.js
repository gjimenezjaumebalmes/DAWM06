/**
 * Classe que representa el joc de la serp (snake)
 * @class
 */
class Game {
    /**
     * Inicialitza els paràmetres del joc i crea el canvas
     * @constructor
     * @param {number} width -  width del canvas
     * @param {number} height -  height del canvas
     * @param {number} amount -  nombre de quadrats per fila de la quadrícula
     */
    constructor(width,height,amount) {
    this.width = width;
    this.height = height;
    this.amount = amount;
    this.snake = [];
    this.direction = "right";
    this.food = [];
    this.score = 0;

    }

    /**
     * Crea un canvas i es guarda el [context](https://developer.mozilla.org/es/docs/Web/API/CanvasRenderingContext2D) a un atribut per poder
     * accedir-hi des dels mètodes de pintar al canvas (com ara drawSquare, clear)
     * @param {number} width -  width del canvas
     * @param {number} height -  height del canvas
     */
    initCanvas(width, height) {
        this.canvas = document.createElement("canvas");
        this.canvas.width = width;
        this.canvas.height = height;
        this.context = this.canvas.getContext("2d");
        document.body.appendChild(this.canvas);
        return this.initCanvas();
    }

    /**
     * Inicialitza els paràmetres del joc:
     * Serp al centre, direcció cap a la dreta, puntuació 0
     */
    start() {
    }

    /**
     * Dibuixa un quadrat de la mida de la quadrícula (passada al constructor) al canvas
     * @param {number} x -  posició x de la quadrícula (no del canvas)
     * @param {number} y -  posició y de la quadrícula (no del canvas)
     * @param {string} color -  color del quadrat
     */
    drawSquare(x,y,color) {
    }

    /**
     * Neteja el canvas (pinta'l de blanc)
     */
    clear() {
        this.context.clearRect(0, 0, this.width, this.height);
    }

    /**
     * Dibuixa la serp al canvas
     */
    drawSnake() {
    }

    /**
     * Dibuixa la poma al canvas
     */
    drawFood() {
    }

    /**
     * La serp xoca amb la posició donada?
     * @param {number} x -  posició x a comprovar
     * @param {number} y -  posició y a comprovar
     * @return {boolean} - xoca o no
     */
    collides(x,y) {
    }

    /**
     * Afegeix un menjar a una posició aleatòria, la posició no ha de ser cap de les de la serp
     */
    addFood() {
    }

    /**
     * Calcula una nova posició a partir de la ubicació de la serp
     * @return {Array} - nova posició
     */
    newTile() {
    }

    /**
     * Calcula el nou estat del joc, nova posició de la serp, nou menjar si n'hi ha ...
     * i ho dibuixa al canvas
     */
    step() {
    }

    /**
     * Actualitza la direcció de la serp a partir de l'event (tecla dreta, esquerra, amunt, avall)
     * @param {event} e - l'event de la tecla premuda
     */
    input(e) {
    }
}


let game = new Game(300,300,15); // Crea un nou joc
document.onkeydown = game.input.bind(game); // Assigna l'event de les tecles a la funció input del nostre joc
window.setInterval(game.step.bind(game),100); // Fes que la funció que actualitza el nostre joc s'executi cada 100ms