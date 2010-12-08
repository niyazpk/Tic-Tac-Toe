// Constants
const EMPTY = 0; // Represents an empty spot
const NOUGHT = 1; //  a Nought
const CROSS = 2; // ...
const INFINITY = 99999; // A very large number
const DEPTH = 5; // How far should the alogorithm search? (the more the better)


// Variables
var bestMove = []; // Used to save the best move till now in the search Tree.
//var moveCount = 0; // Moves till now.

// This is our representation of the board.
// Notice the four tigers in the four corners.
var board = [ 
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
];


// Output the current state of the board to the screen.
function drawBoard(){
    var html= "<table>";
    for(var x=0; x<3; x++){
		html += "<tr>";
		for(var y=0; y<3; y++){
		    class = "item-" + board[x][y];
		    html += "<td x="+x+" y="+y+" class='"+class+"'>" + board[x][y] + "</td>";
		}
		html += "</tr>";
    }
    html += "</table>";
    $('#board').html(html);
}

function isValidMove(x,y){
	if(board[x][y] != EMPTY){
		return false;
	}
    return true;
}

function isNoughtMove(depth){
    if( (DEPTH-depth) % 2 == 0){
		return true;
    }else{
		return false;
    }
}

function generateMoves(){
	var moveslist = [];
	for(var x=0; x<3; x++){
		for(var y=0; y<3; y++){
			if(board[x][y] == EMPTY){
				moveslist.push([x,y]);
			}		
		}
	}
    return moveslist;
}

function makeMove(depth, move){
	if(isNoughtMove(depth)){
		board[move[0]][move[1]] = NOUGHT;
	} else {
		board[move[0]][move[1]] = CROSS;
	}
}

function unMakeMove(move){
	board[move[0]][move[1]] = EMPTY;
}

var dictRows = {
	1 : [[0,0], [0,1], [0,2]],
	2 : [[1,0], [1,1], [1,2]],
	3 : [[2,0], [2,1], [2,2]],
	
	4 : [[0,0], [1,0], [2,0]],
	5 : [[0,1], [1,1], [2,1]],
	6 : [[0,2], [1,2], [2,2]],
	
	7 : [[0,0], [1,1], [2,2]],
	8 : [[2,0], [1,1], [0,2]]
}

function ifCrossWon(){
	return playerWon(CROSS);
}

function ifNoughtWon(){
	return playerWon(NOUGHT);
}

function playerWon(player){
	var count = 0;
	for(var i in dictRows){
		var row = dictRows[i];

		if(
		board[row[0][0]][row[0][1]] === player && 
		board[row[1][0]][row[1][1]] === player && 
		board[row[2][0]][row[2][1]] === player){
			count++;
			
		}
	}
	return count;
}

// Is the current game position and end-game position?
function isTerminal(){
    if (ifCrossWon() || ifNoughtWon() ){
		return true;
    }else{
		return false;
    }
}

function evaluate(depth){
	var value = 0;

	value -= ifNoughtWon() * 1000;
	value += ifCrossWon() * 1000;
	
	if(board[1][1] == NOUGHT){
		value -= 10;
	} else if(board[1][1] == CROSS){
		value += 10;
	}
    value = isNoughtMove(depth) ? -value : value;

    return value;
}

function alphabeta( depth, alpha, beta){
    if(isTerminal() || depth == 0)
		return evaluate(depth);
	
	var moves = generateMoves(depth);
	
    for(var i = 0; i < moves.length; i++){
		makeMove(depth, moves[i]);
		v = -alphabeta( depth-1, -beta, -alpha);
		
		if(v > alpha){
			alpha = v;
			if(depth === DEPTH){
				bestMove = moves[i];
			}
		}
		unMakeMove(moves[i]);
		if(beta <= alpha){break;}
    }
    return alpha;
}

function placeNought(){
	bestMove = [];
    var alpha = -INFINITY;
    var beta = INFINITY;
    alphabeta(DEPTH, alpha, beta);
    makeMove(true, bestMove);
    drawBoard();
    if(ifNoughtWon()){
    	alert("You lost the game.");
    }
    $( "td" ).droppable({drop: fn});
}

$(document).ready(function(){
	drawBoard();
	$('td').live('click',function(){
		x = parseInt($(this).attr('x'));
		y = parseInt($(this).attr('y'));
		if(isValidMove(x,y)){
		    board[x][y] = CROSS;
		    drawBoard();
			if(ifCrossWon()){
				alert("You won the game.");
			}else{			
				setTimeout("placeNought()", 100);
			}
		}
    });
});
