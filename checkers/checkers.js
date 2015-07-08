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
    this.board[7][1] = player2Pieces[0];
    player2Pieces[0].row = 7;
    player2Pieces[0].col = 1;
    this.board[7][3] = player2Pieces[1];
    player2Pieces[1].row = 7;
    player2Pieces[1].col = 3;
    this.board[7][5] = player2Pieces[2];
    player2Pieces[2].row = 7;
    player2Pieces[2].col = 5;
    this.board[7][7] = player2Pieces[3];
    player2Pieces[3].row = 7;
    player2Pieces[3].col = 7;
    this.board[6][0] = player2Pieces[4];
    player2Pieces[4].row = 6;
    player2Pieces[4].col = 0;
    this.board[6][2] = player2Pieces[5];
    player2Pieces[5].row = 6;
    player2Pieces[5].col = 2;
    this.board[6][4] = player2Pieces[6];
    player2Pieces[6].row = 6;
    player2Pieces[6].col = 4;
    this.board[6][6] = player2Pieces[7];
    player2Pieces[7].row = 6;
    player2Pieces[7].col = 6;
    this.board[5][1] = player2Pieces[8];
    player2Pieces[8].row = 5;
    player2Pieces[8].col = 1;
    this.board[5][3] = player2Pieces[9];
    player2Pieces[9].row = 5;
    player2Pieces[9].col = 3;
    this.board[5][5] = player2Pieces[10];
    player2Pieces[10].row = 5;
    player2Pieces[10].col = 5;
    this.board[5][7] = player2Pieces[11];
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
  },updateBoard: function(piece,row,col){
    var oldRow = piece.row;
    var oldCol = piece.col;
    this.board[oldRow][oldCol] = 0;
    this.board[row][col] = piece;
    console.log(this.board);
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
  }else if(this.player == 2){
    var move1Row = row-1;
    var move1Col = col+1;
    var move2Row = row-1;
    var move2Col = col-1;
  }
  if(this.isLegal(move1Row,move1Col) || this.isLegal(move2Row,move2Col)){
    return true;
  }else{
    return false;
  }
}

Piece.prototype.isLegal = function(row,col){
  var board = game.board;
  var newMove = board[row][col];
  var player = this.player
  if(newMove!= 0 && newMove != undefined){
    var otherPlayer = newMove.player;
  }
  if(newMove == 0){
    return true;
  }else if(otherPlayer != undefined && otherPlayer != player){
    console.log("CurrentPlayer " + player);
    console.log("OtherPlayer" + otherPlayer);
    console.log("This is the piece");
    console.log(newMove);
    console.log("Can eat");
    return true
  }else{
    return false;
  }
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
    //console.log("In here");
    var x = event.pageX;
    var y = event.pageY;
    //console.log("We are in makeMove and should be testing legality.")
    if(x > pieceX){
      if(piece.isLegal(move1Row,move1Col)){
        if(piece.canEat(move1Row,move1Col,"right")){
          piece.eat(move1Row,move1Col);
          if(piece.player == 1){
            console.log("1");
            move1Row++;
          }else{
            console.log("2");
            move1Row--;
          }
          move1Col++;
        }
        piece.placePiece(move1Row,move1Col);
        $(this).unbind("click");
      }else{
        piece.illegalMove();
      }
    }else if(x < pieceX){
      if(piece.isLegal(move2Row,move2Col)){
        if(piece.canEat(move2Row,move2Col,"left")){
          console.log("Can eat returned true");
          piece.eat(move2Row,move2Col);
          if(piece.player == 1){
            console.log("3");
            move2Row++;
          }else{
            console.log("4");
            console.log(this.player1)
            move2Row--;
          }
          move2Col--;
        }
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

Piece.prototype.canEat = function(row,col,direction){
  console.log("We are in can eat.");
  var currentPlayer = this.player;
  var otherPlayer = game.board[row][col].player;
  console.log("Current Player: " + currentPlayer);
  console.log("Other Player: " + otherPlayer);
  if(direction == "right"){
    var otherCol = col + 1;
  }else if(direction == "left"){
    var otherCol = col - 1;
  }
  if(this.player == 1){
    var otherRow = row+1; 
  }else{
    var otherRow = row-1;
  }
  var otherSpace = game.board[otherRow][otherCol];
  if(otherSpace == 0 && otherPlayer != undefined && otherPlayer != currentPlayer){
    console.log("Can eat is returning true");
    return true;
  }else{
    console.log("Can eat is returning false");
    return false;
  }
}

Piece.prototype.eat = function(row,col){
  var piece = game.board[row][col];
  console.log("This is the piece in that is going to be eaten");
  console.log(piece);
  piece.removePiece();
  game.board[row][col] = 0;
}

Piece.prototype.placePiece = function(row,col){
  this.removePiece();
  game.updateBoard(this,row,col);
  this.row = row;
  this.col = col;
  this.draw();
  game.nextPlayer();
}

Piece.prototype.removePiece = function(){
  $(this.div).html("");
  $(this.div).removeClass("glow");
}

Piece.prototype.draw = function(num){
  var row = this.row+1;
  var col = this.col;
  var rowDiv = $("#"+row);
  this.div = rowDiv.children()[col+2];
  var piece = this;
  $(this.div).html('<span class="glyphicon glyphicon-record player' + this.player + '" aria-hidden="true"></span>');
}

Piece.prototype.illegalMove = function(){
  console.log("Illegal Move");
}

$(document).ready(function(){
  game.placePieces();
  game.drawPieces();
  game.players[0].play();
});






