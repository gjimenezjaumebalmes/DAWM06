
class Game {

    constructor(width, height, amount) {
        this.width = width;
        this.height = height;
        this.amount = amount;
        this.initCanvas(width, height);
        this.start();
    }


    initCanvas(width, height) {
        let canvas = document.getElementById("canvas");
        this.context = canvas.getContext("2d");
        canvas.width = width;
        canvas.height = height;

    }

    start() {
        this.serp = [[parseInt(this.amount / 2), parseInt(this.amount / 2)]];
        this.direction = [1, 0]; //dreta
    }

    drawSquare(x, y, color) {
        let mida = this.width / this.amount;
        this.context.fillStyle = color;
        this.context.fillRect(0, 0, mida, mida);

    }


    clear() {
        let fons = "green";
        this.context.fillStyle = fons;
        this.context.fillRect(0, 0, this.width, this.height);
        return clear()
    }


    drawSnake() {
        for (let i = 0; i < this.serp.length; i++) {
            this.drawSquare(this.serp[i][0], this.serp[i][1], "black");
        }
    }

    // newTile() {
    //     let resultat = [0, 0];
    //
    //     let x = (this.serp[0][0] + this.direccio[0]);
    //     let y = (this.serp[0][1] + this.direccio[1]);
    //     resultat[0] = x % this.amount;
    //     resultat[1] = y % this.amount;
    //     if (x < 0) resultat[0] = this.amount + x;
    //     if (y < 0) resultat[1] = this.amount + y;
    //     return resultat;
    // }

    step() {
        this.drawSnake();
        this.clear()
    }

    /**
     * Actualitza la direcció de la serp a partir de l'event (tecla dreta, esquerra, amunt, avall)
     * @param {event} e - l'event de la tecla premuda
     */
    input(e) {
        if (e.keyCode == 37) { // esquerra
            // this.direccio = [1,0]
            this.direccio = [-1, 0];

        } else if (e.keyCode == 38) { // amunt
            this.direccio = [0, -1];
        } else if (e.keyCode == 39) { // dreta
            this.direccio = [1, 0];
        } else if (e.keyCode == 40) { // avall
            this.direccio = [0, 1];
        }

    }
}

let game = new Game(400,400,15); // Crea un nou joc
document.onkeydown = game.input.bind(game); // Assigna l'event de les tecles a la funció input del nostre joc
window.setInterval(game.step.bind(game),100); // Fes que la funció que actualitza el nostre joc s'executi cada 100ms