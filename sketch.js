let board = [
	["", "", ""],
	["", "", ""],
	["", "", ""],
];

let player1 = "X";
let player2 = "O";

function setup() {
	createCanvas(400, 400);
}

function draw() {
	background(220);
	let w = width;
	let h = height;

	let wOffset = w / 3;
	let hOffset = h / 3;

	// horizontal border
	line(0, hOffset, w, hOffset);
	line(0, hOffset * 2, w, hOffset * 2);

	// vertical border
	line(wOffset, 0, wOffset, h);
	line(wOffset * 2, 0, wOffset * 2, h);

	strokeWeight(3);
}
