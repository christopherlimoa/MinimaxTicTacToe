let board = [
	["", "", ""],
	["", "", ""],
	["", "", ""],
];

const players = ["X", "O"];
let moveCount = 0;
const MAX_MOVE_COUNT = 9;

// p5js setup function, called at the start 
function setup() {
	createCanvas(400, 400);
	frameRate(5);

	// random number to choose which player start first
	randomStart = floor(random(players.length));

	// AI starting first
	if(randomStart == 1){
		AImove = moveAI();
		board[AImove[0]][AImove[1]] = players[1];
		moveCount += 1;
	}
}

// function to check equality of three items
function equals3(a, b, c) {
	return a == b && b == c && a != "";
}

// check the winner of the current board state
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

	if (winner == null && moveCount == MAX_MOVE_COUNT) {
		return "tie";
	} else {
		return winner;
	}
}

// this function returns array of all available moves
// left in the given board in [i,j] format
function getAvailable(){
	let available = [];

	// check every spot for empty spot (possible move)
	for(let i=0; i<3; i++){
		for(let j=0; j<3; j++){
			if(board[i][j] == ""){
				available.push([i,j]);
			}
		}
	}

	return available;
}

// evaluate the state of the board, which player is winning
function evaluate(){
	winner = checkWinner();

	// player X (maximising)
	if(winner == players[0])
		return 100; // arbitrary positive score
	// player O (minimising)
	else if(winner == players[1])
		return -100; // arbitrary negative score
	else
		return 0; // draw
}

// give the best possible move from current board state in [i,j,score] format
function minimax(available, player){
	let score, bestScore, best;

	// default best value
	if (player == players[0])
		best = [null, null, -Infinity];
	else
		best = [null, null, Infinity];

	// base case of recursion
	if (available.length == 0 || checkWinner() !== null){
		score = evaluate();
		return [null, null, score];
	}

	// evaluate every possible move
	available.forEach(move => {
		board[move[0]][move[1]] = player;

		// result is [null,null,score]
		result = minimax(getAvailable(), (player==players[1]) ? players[0] : players[1]);
		
		// reset board state to before
		board[move[0]][move[1]] = ""; 

		// compare the best move from evaluation 
		score = result[2];
		bestScore = best[2];

		if (player == players[0]){
			// set new move as best move if the score is better (in max case, greater)
			if(score > bestScore){
				best = [move[0], move[1], score];
			}
		}
		else{
			// set new move as best move if the score is better (in min case, smaller)
			if(score < bestScore){
				best = [move[0], move[1], score];
			}
		}
	});

	return best;
}

// determine the next move of AI
function moveAI() {
	let empty = getAvailable();
	let move;

	// choose randomly if starting first (to make game more interesting)
	if (empty.length == 9) {
		let index = floor(random(empty.length));
		move = empty.splice(index, 1)[0];
	}
	else {
		move = minimax(empty, players[1]);
	}

	return move;
}

// detect mouse presses
function mousePressed() {
	// find the indices of mouse press based on 3x3 grid
	i = floor(mouseX / (width/3) % 3);
	j = floor(mouseY / (height/3) % 3);

	// only let player move if clicked spot is empty
	if(board[i][j] == ""){
		board[i][j] = players[0];
		moveCount += 1;
		
		AImove = moveAI();
		board[AImove[0]][AImove[1]] = players[1];
		moveCount += 1;
	}
}

// p5js draw function to draw
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
		// nextTurn();
	}
}

// built-n p5js function to detect key presses
function keyPressed() {
    if (keyCode == RETURN) {
		resetValues();
		removeElements();
		setup();
		loop();
    }
}

// reset game's variable into default empty values
function resetValues(){
	board = [
		["", "", ""],
		["", "", ""],
		["", "", ""],
	];

	moveCount = 0;
}

// restart game to at the start of the game using button
function resetByButton(){
	resetValues();
	removeElements();
	setup();
	loop();
}