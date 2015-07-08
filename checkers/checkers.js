var game = {
  players: makePlayers(),
  board: makeBoard(),
  gameOver: false,
  currentPlayer: 1,
  locked: false,
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
    player2Pieces[0].col = 1;
    this.board[7][2] = player2Pieces[1];
    player2Pieces[1].row = 7;
    player2Pieces[1].col = 3;
    this.board[7][4] = player2Pieces[2];
    player2Pieces[2].row = 7;
    player2Pieces[2].col = 5;
    this.board[7][6] = player2Pieces[3];
    player2Pieces[3].row = 7;
    player2Pieces[3].col = 7;
    this.board[6][1] = player2Pieces[4];
    player2Pieces[4].row = 6;
    player2Pieces[4].col = 0;
    this.board[6][3] = player2Pieces[5];
    player2Pieces[5].row = 6;
    player2Pieces[5].col = 2;
    this.board[6][5] = player2Pieces[6];
    player2Pieces[6].row = 6;
    player2Pieces[6].col = 4;
    this.board[6][7] = player2Pieces[7];
    player2Pieces[7].row = 6;
    player2Pieces[7].col = 6;
    this.board[5][0] = player2Pieces[8];
    player2Pieces[8].row = 5;
    player2Pieces[8].col = 1;
    this.board[5][2] = player2Pieces[9];
    player2Pieces[9].row = 5;
    player2Pieces[9].col = 3;
    this.board[5][4] = player2Pieces[10];
    player2Pieces[10].row = 5;
    player2Pieces[10].col = 5;
    this.board[5][6] = player2Pieces[11];
    player2Pieces[11].row = 5;
    player2Pieces[11].col = 7;
  },
  drawPieces: function(){
    var player1Pieces = this.players[0].pieces;
    var player2Pieces = this.players[1].pieces;
    for(var i = 0; i < player1Pieces.length;i++){
      var piece1 = player1Pieces[i];
      var piece2 = player2Pieces[i];
      piece1.draw(i);
      piece2.draw(i);
    }
  },
  nextPlayer: function(){
    this.locked = false;
    if(this.currentPlayer == 1){
      this.players[0].unplay();
      this.players[1].play();
      this.currentPlayer = 2;
    }else{
      this.players[1].unplay();
      this.players[0].play();
      this.currentPlayer = 1;
    }
  },runGame: function(){
    if(this.currentPlayer == 1){
      this.players[0].play();
      this.players[1].unplay();
    }else if(this.currentPlayer == 2){
      this.players[1].play();
      this.players[0].unplay();
    }
  }
}

function makePlayers(){
  var players = [];
  var player1 = new Player(true,1);
  var player2 = new Player(false,2);
  players.push(player1)
  players.push(player2)
  return players;
}

function Player(home,num){
  this.home = home;
  this.pieces = makePieces(num);
  this.num = num;
  this.winner = false;
}

function makePieces(num){
  var pieces = [];
  for(var i = 0; i < 12; i++){
    var id = num*12-12+i+1
    var piece = new Piece(num,id);
    pieces.push(piece);
  }
  return pieces;
}

function Piece(num,id){
  this.king = false;
  this.row = 0;
  this.col = 0;
  this.player = num;
  this.taken = false;
  this.id = id;
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

Player.prototype.play = function(){
  var pieces = this.pieces;
  for(var i = 0; i < pieces.length;i++){
    pieces[i].initateMove();
  }
}

Player.prototype.unplay = function(){
  var pieces = this.pieces;
  for(var i = 0; i < pieces.length;i++){
    pieces[i].stopMove();
  }
}

Piece.prototype.stopMove = function(){
  $(this.div).unbind("click");
}

Piece.prototype.initateMove = function(){
  if(this.canMove()){
    var piece = this;
    var row = this.row+1;
    var col = this.col;
    $(this.div).click(function(event){
      event.stopPropagation();
      if(game.locked == false){
        game.locked = true;
        $(this).addClass("glow");
        var pieceX = event.pageX;
        var pieceY = event.pageY;
        piece.makeMove(pieceX,pieceY);
      }else{
        console.log("The game is currently locked.");
      } 
    });
  }
}

Piece.prototype.canMove = function(){
  var row = this.row;
  var col = this.col;
  if(this.player == 1){
    var move1Row = row+1;
    var move1Col = col+1;
    var move2Row = row+1;
    var move2Col = col-1;
  }else{
    var move1Row = row-1;
    var move1Col = col+1;
    var move2Row = row-1;
    var move2Col = col-1;
  }
  if(this.isLegal(move1Row,move1Col) || this.isLegal(move2Row,move2Col)){
    console.log("Can move");
    console.log(this.id);
    return true;
  }else{
    console.log("Can't move");
    console.log(this.id);
    return false;
  }
}

Piece.prototype.draw = function(num){
  var row = this.row+1;
  var col = this.col;
  var rowDiv = $("#"+row);
  this.div = rowDiv.children()[col+2];
  var piece = this;
  $(this.div).html('<span class="glyphicon glyphicon-record player' + this.player + '" aria-hidden="true"></span>');
}

Piece.prototype.makeMove = function(pieceX,pieceY){
  var piece = this;
  var row = this.row;
  var col = this.col;
  if(this.player == 1){
    var move1Row = row+1;
    var move1Col = col+1;
    var move2Row = row+1;
    var move2Col = col-1;
  }else{
    var move1Row = row-1;
    var move1Col = col+1;
    var move2Row = row-1;
    var move2Col = col-1;
  }
  $(document).click(function(event){
    console.log("In here");
    var x = event.pageX;
    var y = event.pageY;
    console.log("We are in makeMove and should be testing legality.")
    if(x > pieceX){
      if(piece.isLegal(move1Row,move1Col)){
        console.log("The move is legal.");
        piece.placePiece(move1Row,move1Col);
        $(this).unbind("click");
      }else{
        piece.illegalMove();
      }
    }else if(x < pieceX){
      if(piece.isLegal(move2Row,move2Col)){
        console.log("The move is legal.");
        piece.placePiece(move2Row,move2Col);
        $(this).unbind("click");
      }else{
        piece.illegalMove();
      }
    }else{
      console.log("Wtf");
    }
  });
}

Piece.prototype.isLegal = function(row,col){
  var board = game.board;
  console.log("We are in isLegal");
  var newMove = board[row][col];
  if(newMove == 0){
    return true;
  }else{
    return false;
  }
}

Piece.prototype.placePiece = function(row,col){
  console.log("We are in placePiece");
  this.removePiece();
  this.row = row;
  this.col = col;
  this.draw();
  game.nextPlayer();
  //console.log("The game should be unlocked");
  //console.log(game.locked);
}

Piece.prototype.removePiece = function(){
  $(this.div).html("");
}

Piece.prototype.illegalMove = function(){
  console.log("Illegal Move");
}

$(document).ready(function(){
  game.placePieces();
  game.drawPieces();
  game.players[0].play();
});






