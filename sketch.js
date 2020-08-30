let board = [
	["", "", ""],
	["", "", ""],
	["", "", ""],
];

let players = ["X", "O"];
let available = [];

function setup() {
	createCanvas(400, 400);
	frameRate(1);
	currentPlayer = floor(random(players.length));

	// fill board with alternate pattern
	for (let i = 0; i < board.length; i++) {
		for (let j = 0; j < board[0].length; j++) {
			available.push([i, j]);
		}
	}
}

function equals3(a, b, c) {
	return a == b && b == c && a != "";
}

function checkWinner() {
	let winner = null;

	// check horizontals
	for (let i = 0; i < 3; i++) {
		if (equals3(board[i][0], board[i][1], board[i][2])) {
			winner = board[i][0];
		}
	}

	// check verticals
	for (let i = 0; i < 3; i++) {
		if (equals3(board[0][i], board[1][i], board[2][i])) {
			winner = board[0][i];
		}
	}

	// check diagonals
	if (equals3(board[0][0], board[1][1], board[2][2])) {
		winner = board[0][0];
	}
	if (equals3(board[0][2], board[1][1], board[2][0])) {
		winner = board[0][2];
	}

	if (winner == null && available.length == 0) {
		return "tie";
	} else {
		return winner;
	}
}

// function mousePressed() {
// 	nextTurn();
// }

function nextTurn() {
	let index = floor(random(available.length));
	let spot = available.splice(index, 1)[0];
	let i = spot[0];
	let j = spot[1];
	board[i][j] = players[currentPlayer];

	// alternate player turn
	currentPlayer = (currentPlayer + 1) % players.length;
}

function draw() {
	background(220);
	let w = width;
	let h = height;

	let wBorder = w / 3;
	let hBorder = h / 3;

	// horizontal border
	line(0, hBorder, w, hBorder);
	line(0, hBorder * 2, w, hBorder * 2);

	// vertical border
	line(wBorder, 0, wBorder, h);
	line(wBorder * 2, 0, wBorder * 2, h);

	// set line size (thickness)
	strokeWeight(3);

	// draw X and O in board
	for (let i = 0; i < board.length; i++) {
		for (let j = 0; j < board[0].length; j++) {
			let item = board[i][j];
			let x = wBorder * (i + 1) - wBorder / 2;
			let y = hBorder * (j + 1) - hBorder / 2;

			// draw X in board
			if (item == players[0]) {
				let xr = wBorder / 4;

				line(x, y, x - xr, y - xr);
				line(x, y, x + xr, y - xr);
				line(x, y, x + xr, y + xr);
				line(x, y, x - xr, y + xr);
			}

			// draw O in board
			else if (item == players[1]) {
				let r = wBorder / 1.75;
				noFill();
				ellipse(x, y, r);
			}
		}
	}

	let winner = checkWinner();

	if (winner != null) {
		noLoop();

		let winnerP = createP();

		if (winner == "tie") {
			winnerP.html("Tie! No one wins.");
		} else {
			winnerP.html("Winner is: " + winner);
		}
	} else {
		nextTurn();
	}
}
