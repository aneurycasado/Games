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
    if(this.isGameOver()){
      console.log("Game Over");
    }else{
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
      this.updateCurrentPlayer();
    }
  },isGameOver: function(){
    var player1 = this.players[0];
    var player2 = this.players[1];
    var gameOver1 = checkGameOver(player1);
    var gameOver2 = checkGameOver(player2);
    if(gameOver1 || gameOver2){
      return true
    }else{
      return false
    }
  },updateBoard: function(piece,row,col){
    var oldRow = piece.row;
    var oldCol = piece.col;
    this.board[oldRow][oldCol] = 0;
    this.board[row][col] = piece;
  },updateCurrentPlayer: function(){
    var currentPlayer = this.currentPlayer
    $("#currentPlayer").html('<h1 id = "player"' + currentPlayer + '>Player ' + currentPlayer + '</h1>');
  }
}

function checkGameOver(player){
  var num = player.num;
  for(var i = 0; i < game.board.length;i++){
    var row = game.board[i];
    for(var j = 0; j < row.length;j++){
      var piece = row[j];
      if(piece.player == num){
        return false
      }
    }
  }
  return true;
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
  this.removed = false;
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
        //$(this).removeClass("glow");
        //$(this).unbind("click");
      }
    });
  }
}

Piece.prototype.canMove = function(){
  var row = this.row;
  var col = this.col;
  if(this.king){
    var move1Row = row+1;
    var move1Col = col+1;
    var move2Row = row+1;
    var move2Col = col-1;
    var move3Row = row-1;
    var move3Col = col+1;
    var move4Row = row-1;
    var move4Col = col-1;
    if(this.isLegal(move1Row,move1Col) || this.isLegal(move2Row,move2Col) || this.isLegal(move3Row,move3Col) || this.isLegal(move4Row,move4Col)){
      return true;
    }else{
      return false
    }
  }else{
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
}

Piece.prototype.isLegal = function(row,col){
  var board = game.board;
  var pieceCol = this.col;
  if(row < 0 || row > 7){
    return false;
  }
  var newMove = board[row][col];
  var player = this.player
  if(newMove!= 0 && newMove != undefined){
    var otherPlayer = newMove.player;
  }
  if(newMove == 0){
    return true;
  }else if(otherPlayer != undefined && otherPlayer != player){
    if(col > this.col){
      if(this.canEat(row,col,"right")){
        return true;
      }else{
        return false;
      }
    }else if(col < this.col){
      if(this.canEat(row,col,"left")){
        return true;
      }else{
        return false;
      }
    }
  }else{
    return false;
  }
}

Piece.prototype.canEat = function(row,col,direction){
  var currentPlayer = this.player;
  console.log(row,col);
  if(row < 0 || row > 7 || col < 0 || col > 7){
    return false
  };
  var otherPlayer = game.board[row][col].player;
  if(direction == "right"){
    var otherCol = col + 1;
  }else if(direction == "left"){
    var otherCol = col - 1;
  }
  if(this.king == true){
    if(this.row < row){
      var otherRow = row + 1;
    }else{
      var otherRow = row - 1;
    }
  }else{
    if(this.player == 1){
      var otherRow = row+1;
    }else{
      var otherRow = row-1;
    }
  }
  if(otherRow > 7 || otherRow < 0){
    return false;
  }
  var otherSpace = game.board[otherRow][otherCol];
  if(otherSpace == 0 && otherPlayer != undefined && otherPlayer != currentPlayer){
    return true;
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
    var x = event.pageX;
    var y = event.pageY;
    if(piece.king == false){
        if(x > pieceX){
          makeMoveRight(move1Row,move1Col,piece);
          $(this).unbind("click");
        }else if(x < pieceX){
          makeMoveLeft(move2Row,move2Col,piece);
          $(this).unbind("click");
        }else{
          console.log("Wtf");
        }
    }else if(piece.king == true){
      if(x > pieceX && y < pieceY){
        makeMoveRightUp(row,col,piece);
        $(this).unbind("click");
      }else if(x < pieceX && y < pieceY){
        makeMoveLeftUp(row,col,piece);
        $(this).unbind("click");
      }else if(x > pieceX && y > pieceY){
        makeMoveRightDown(row,col,piece);
        $(this).unbind("click");
      }else if(x < pieceX && y > pieceY){
        makeMoveLeftDown(row,col,piece);
        $(this).unbind("click");
      }
    }
  });
}

function makeMoveLeftUp(row,col,piece){
  var newRow = row - 1;
  var newCol = col - 1;
  if(piece.isLegal(newRow,newCol)){
    if(piece.canEat(newRow,newCol,"left")){
      piece.eat(newRow,newCol)
      newRow--;
      newCol--;
      var position = doubleJumpKing(newRow,newCol,piece);
      newRow = position[0];
      newCol = position[1];
    };
    piece.placePiece(newRow,newCol);
    $(piece.div).unbind("click")
  }else{
    piece.illegalMove();
  }
}

function makeMoveRightUp(row,col,piece){
  var newRow = row - 1;
  var newCol = col + 1;
  if(piece.isLegal(newRow,newCol)){
    if(piece.canEat(newRow,newCol,"right")){
      piece.eat(newRow,newCol)
      newRow--;
      newCol++;
      var position = doubleJumpKing(newRow,newCol,piece);
      newRow = position[0];
      newCol = position[1];
    };
    piece.placePiece(newRow,newCol);
    $(piece.div).unbind("click")
  }else{
    piece.illegalMove();
  }
};

function makeMoveRightDown(row,col,piece){
  var newRow = row + 1;
  var newCol = col + 1;
  if(piece.isLegal(newRow,newCol)){
    if(piece.canEat(newRow,newCol,"right")){
      piece.eat(newRow,newCol)
      newRow++;
      newCol++;
      var position = doubleJumpKing(newRow,newCol,piece);
      newRow = position[0];
      newCol = position[1];
    };
    piece.placePiece(newRow,newCol);
    $(piece.div).unbind("click")
  }else{
    piece.illegalMove();
  }
}

function makeMoveLeftDown(row,col,piece){
  var newRow = row + 1;
  var newCol = col - 1;
  if(piece.isLegal(newRow,newCol)){
    if(piece.canEat(newRow,newCol,"left")){
      piece.eat(newRow,newCol)
      newRow++;
      newCol--;
      var position = doubleJumpKing(newRow,newCol,piece);
      newRow = position[0];
      newCol = position[1];
    };
    piece.placePiece(newRow,newCol);
    $(piece.div).unbind("click")
  }else{
    piece.illegalMove();
  }
}

function doubleJumpKing(newRow,newCol,piece){
  if(piece.canEat(newRow+1,newCol-1,"left")){
    piece.eat(newRow+1,newCol-1)
    newRow = newRow + 2;
    newCol = newCol - 2;
  }else if(piece.canEat(newRow+1,newCol+1,"right")){
    piece.eat(newRow+1,newCol+1)
    newRow = newRow+2;
    newCol = newCol+2;
  }else if(piece.canEat(newRow-1,newCol-1,"left")){
    piece.eat(newRow-1,newCol-1)
    newRow = newRow - 2;
    newCol = newCol - 2;
  }else if(piece.canEat(newRow-1,newCol+1,"right")){
    piece.eat(newRow-1,newCol+1);
    newRow = newRow-2;
    newCol = newCol+2;
  }
  return [newRow,newCol];
}

function makeMoveRight(move1Row,move1Col,piece){
  if(piece.isLegal(move1Row,move1Col)){
    if(piece.canEat(move1Row,move1Col,"right")){
      piece.eat(move1Row,move1Col);
      if(piece.player == 1){
        move1Row++;
        var modifier = 1;
      }else{
        move1Row--;
        var modifier = -1;
      }
      move1Col++;
      var position = doubleJumpMen(move1Row,move1Col,modifier,piece);
      var move1Row = position[0];
      var move1Col = position[1];
    };
    piece.placePiece(move1Row,move1Col);
    $(piece.div).unbind("click")
  }else{
    piece.illegalMove();
  }
}

function makeMoveLeft(move2Row,move2Col,piece){
  if(piece.isLegal(move2Row,move2Col)){
    if(piece.canEat(move2Row,move2Col,"left")){
      piece.eat(move2Row,move2Col);
      if(piece.player == 1){
        move2Row++;
        var modifier = 1;
      }else{
        move2Row--;
        var modifier = -1;
      }
      move2Col--;
      var position = doubleJumpMen(move2Row,move2Col,modifier,piece);
      var move2Row = position[0];
      var move2Col = position[1];
    };
    piece.placePiece(move2Row,move2Col);
    $(this).unbind("click");
  }else{
    piece.illegalMove();
  }
};

function doubleJumpMen(row,col,modifier,piece){
  if(piece.canEat(row+modifier,col-1,"left")){
    piece.eat(row+modifier,col-1);
    if(piece.player == 1){
      row = row+modifier+1;
    }else{
      row = row+modifier-1;
    }
    col = col - 2;
  }else if(piece.canEat(row+modifier,col+1,"right")){
    piece.eat(row+modifier,col+1);
    if(piece.player == 1){
      row = row + modifier+1;
    }else{
      row = row+modifier-1;
    }
    col = col + 2;
  }
  return [row,col];
}


Piece.prototype.eat = function(row,col){
  var piece = game.board[row][col];
  piece.removePiece();
  game.board[row][col] = 0;
}

Piece.prototype.placePiece = function(row,col){
  this.removePiece();
  game.updateBoard(this,row,col);
  this.row = row;
  this.col = col;
  if(this.row == 7 || this.row == 0){
    this.king = true;
  }
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
  if(this.king == true){
    $(this.div).html('<span class="glyphicon glyphicon-tower player' + this.player + '" aria-hidden="true"></span>');
  }else if(this.king == false){
    $(this.div).html('<span class="glyphicon glyphicon-record player' + this.player + '" aria-hidden="true"></span>');
  }
}

Piece.prototype.illegalMove = function(){
  $(this.div).removeClass("glow");
  $(this).unbind("click");
  game.locked = false;
}

$(document).ready(function(){
  game.placePieces();
  game.drawPieces();
  game.players[0].play();
});
