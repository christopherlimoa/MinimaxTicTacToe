let board = [
	["", "", ""],
	["", "", ""],
	["", "", ""],
];

let player1 = "X";
let player2 = "O";

function setup() {
	createCanvas(400, 400);

	let alternator = true;

	// fill board with alternate pattern
	for (let i = 0; i < board.length; i++) {
		for (let j = 0; j < board[0].length; j++) {
			if (alternator == true) {
				board[i][j] = "X";
				alternator = !alternator;
			} else {
				board[i][j] = "O";
				alternator = !alternator;
			}
		}
	}
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
			if (item == player1) {
				let xr = wBorder / 4;

				line(x, y, x - xr, y - xr);
				line(x, y, x + xr, y - xr);
				line(x, y, x + xr, y + xr);
				line(x, y, x - xr, y + xr);
			}

			// draw O in board
			else if (item == player2) {
				let r = wBorder / 2;
				noFill();
				ellipse(x, y, r);
			}
		}
	}
}
