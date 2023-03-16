class Game {

	constructor(width, height, amount) {
		this.width = width;
		this.height = height;
		this.amount = amount;
		this.tileSize = this.width / this.amount;
		this.canvas = null;
		this.ctx = null;
		this.snake = [];
		this.food = {};
		this.direction = "right";
		this.score = 0;
		this.initCanvas(this.width, this.height);
		this.start();
	}

	initCanvas(width, height) {
		this.canvas = document.createElement("canvas");
		this.canvas.width = width;
		this.canvas.height = height;
		document.body.appendChild(this.canvas);
		this.ctx = this.canvas.getContext("2d");
	}

	start() {
		this.snake.push({x: Math.floor(this.amount / 2), y: Math.floor(this.amount / 2)});
		this.addFood();
	}

	drawSquare(x, y, color) {
		this.ctx.fillStyle = color;
		this.ctx.fillRect(x * this.tileSize, y * this.tileSize, this.tileSize, this.tileSize);
	}

	clear() {
		this.ctx.fillStyle = "#FFFFFF";
		this.ctx.fillRect(0, 0, this.width, this.height);
	}

	drawSnake() {
		for (let i = 0; i < this.snake.length; i++) {
			this.drawSquare(this.snake[i].x, this.snake[i].y, "#000000");
		}
	}

	addFood() {
		let foodX, foodY;
		do {
			foodX = Math.floor(Math.random() * this.amount);
			foodY = Math.floor(Math.random() * this.amount);
		} while (this.collides(foodX, foodY));
		this.food = {x: foodX, y: foodY};
	}

	collides(x, y) {
		for (let i = 0; i < this.snake.length; i++) {
			if (this.snake[i].x === x && this.snake[i].y === y) {
				return true;
			}
		}
		return false;
	}

	newTile() {
		let head = this.snake[this.snake.length - 1];
		let newTile = [];

		if (this.direction === 'right') {
			newTile = [head[0] + 1, head[1]];
		} else if (this.direction === 'left') {
			newTile = [head[0] - 1, head[1]];
		} else if (this.direction === 'up') {
			newTile = [head[0], head[1] - 1];
		} else if (this.direction === 'down') {
			newTile = [head[0], head[1] + 1];
		}

		if (newTile[0] >= this.amount){
			newTile[0] = 0;
		} else if (newTile[0] < 0) {
			newTile[0] = this.amount - 1;
		} else if (newTile[1] >= this.amount) {
			newTile[1] = 0;
		} else if (newTile[1] < 0) {
			newTile[1] = this.amount - 1
		}

		if (this.collides(newTile[0], newTile[1])) {
			this.gameOver();
			return;
		}

		this.snake.push(newTile);

		if (newTile[0] === this.food[0] && newTile[1] === this.food[1]) {
			this.score += 10;
			this.addFood();
		} else {
			this.snake.shift();
		}
	}


	step() {
		this.clear();
		this.drawSnake();
		this.drawSquare(this.food[0], this.food[1], "#FF0000");
		this.newTile();
	}


	input(e) {
		if (e.keyCode === 37 && this.direction !== "right") {
			this.direction = "left";
		} else if (e.keyCode === 38 && this.direction !== "down") {
			this.direction = "up";
		} else if (e.keyCode === 39 && this.direction !== "left") {
			this.direction = "right";
		} else if (e.keyCode === 40 && this.direction !== "up") {
			this.direction = "down";
		}
	}


	gameOver() {
		alert("Game Over! Score: " + this.score);
		window.location.reload();
	}

}

	let game = new Game(300,300,15); // Crea un nou joc
	document.onkeydown = game.input.bind(game); // Assigna l'event de les tecles a la funció input del nostre joc
	window.setInterval(game.step.bind(game),100); // Fes que la funció que actualitza el nostre joc s'executi cada 100ms

