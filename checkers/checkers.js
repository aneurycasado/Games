function makePieces(num){
  var pieces = [];
  for(var i = 0; i < 12; i++){
    var piece = new Piece(num);
    pieces.push(piece);
  }
  return pieces;
}

function Piece(num){
  this.king = false;
  this.row = 0;
  this.col = 0;
  this.player = num;
  this.taken = false;
}

function Player(home,num){
  this.home = home;
  this.pieces = makePieces(num);
  this.num = num;
  this.winner = false;
}

function makePlayers(){
  var players = [];
  var player1 = new Player(true,1);
  var player2 = new Player(false,2);
  players.push(player1)
  players.push(player2)
  console.log(players);
  return players;
}

function makeBoard(){
  var board = [];
  for(var i = 0; i < 8; i++){
    var row = [];
    for(var j = 0; j < 8; j++){
      row.push(0);
    }
    board.push(row);
  }
  return board;
}

var game = {
  players: makePlayers(),
  board: makeBoard(),
  placePieces: function(){
    var player1Pieces = this.players[0].pieces;
    var player2Pieces = this.players[1].pieces;
    this.board[0][0] = player1Pieces[0];
    player1Pieces[0].row = 0;
    player1Pieces[0].col = 0;
    this.board[0][2] = player1Pieces[1];
    player1Pieces[1].row = 0;
    player1Pieces[1].col = 2;
    this.board[0][4] = player1Pieces[2];
    player1Pieces[2].row = 0;
    player1Pieces[2].col = 4;
    this.board[0][6] = player1Pieces[3];
    player1Pieces[3].row = 0;
    player1Pieces[3].col = 6;
    this.board[1][1] = player1Pieces[4];
    player1Pieces[4].row = 1;
    player1Pieces[4].col = 1;
    this.board[1][3] = player1Pieces[5];
    player1Pieces[5].row = 1;
    player1Pieces[5].col = 3;
    this.board[1][5] = player1Pieces[6];
    player1Pieces[6].row = 1;
    player1Pieces[6].col = 5;
    this.board[1][7] = player1Pieces[7];
    player1Pieces[7].row = 1;
    player1Pieces[7].col = 7;
    this.board[2][0] = player1Pieces[8];
    player1Pieces[8].row = 2;
    player1Pieces[8].col = 0;
    this.board[2][2] = player1Pieces[9];
    player1Pieces[9].row = 2;
    player1Pieces[9].col = 2;
    this.board[2][4] = player1Pieces[10];
    player1Pieces[10].row = 2;
    player1Pieces[10].col = 4;
    this.board[2][6] = player1Pieces[11];
    player1Pieces[11].row = 2;
    player1Pieces[11].col = 6;
    this.board[7][0] = player2Pieces[0];
    player2Pieces[0].row = 7;
    player2Pieces[0].col = 0;
    this.board[7][2] = player2Pieces[1];
    player2Pieces[1].row = 7;
    player2Pieces[1].col = 2;
    this.board[7][4] = player2Pieces[2];
    player2Pieces[2].row = 7;
    player2Pieces[2].col = 4;
    this.board[7][6] = player2Pieces[3];
    player2Pieces[3].row = 7;
    player2Pieces[3].col = 6;
    this.board[6][1] = player2Pieces[4];
    player2Pieces[4].row = 6;
    player2Pieces[4].col = 1;
    this.board[6][3] = player2Pieces[5];
    player2Pieces[5].row = 6;
    player2Pieces[5].col = 3;
    this.board[6][5] = player2Pieces[6];
    player2Pieces[6].row = 6;
    player2Pieces[6].col = 5;
    this.board[6][7] = player2Pieces[7];
    player2Pieces[7].row = 6;
    player2Pieces[7].col = 7;
    this.board[5][0] = player2Pieces[8];
    player2Pieces[8].row = 5;
    player2Pieces[8].col = 0;
    this.board[5][2] = player2Pieces[9];
    player2Pieces[9].row = 5;
    player2Pieces[9].col = 2;
    this.board[5][4] = player2Pieces[10];
    player2Pieces[10].row = 5;
    player2Pieces[10].col = 4;
    this.board[5][6] = player2Pieces[11];
    player2Pieces[11].row = 5;
    player2Pieces[11].col = 6;
    console.log("Board after place pieces");
    console.log(this.board);
    console.log(this.players);
  },
}


$(document).ready(function(){
	window.resizeTo(1000,1000)
  var windowWidth = $(window).width()/2;
	var windowHeight = $(window).height();
  var board = $("#boardImage");
	board.css({"width":windowWidth.toString(),"height":windowHeight.toString()});
  game.placePieces()
});
