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
    return false;
  },updateBoard: function(piece,row,col){
    var oldRow = piece.row;
    var oldCol = piece.col;
    this.board[oldRow][oldCol] = 0;
    this.board[row][col] = piece;
    console.log(this.board);
  },updateCurrentPlayer: function(){
    var currentPlayer = this.currentPlayer
    $("#currentPlayer").html('<h1 id = "player"' + currentPlayer + '>Player ' + currentPlayer + '</h1>');
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
    var x = event.pageX;
    var y = event.pageY;
    //console.log("We are in makeMove and should be testing legality.")
    if(piece.king == false){
          if(x > pieceX){
            console.log("Right");
            makeMoveRight(move1Row,move1Col,piece);
            $(this).unbind("click");
          }else if(x < pieceX){
            console.log("Left");
            makeMoveLeft(move2Row,move2Col,piece);
            $(this).unbind("click");
          }else{
            console.log("Wtf");
          }
      }else if(piece.king == true){
        console.log("King");
      }
  });
}

function makeMoveRight(move1Row,move1Col,piece){
  if(piece.isLegal(move1Row,move1Col)){
    if(piece.canEat(move1Row,move1Col,"right")){
      console.log("Can Eat returned true");
      //if(piece.doubleEat(move2Row,move2Col,"left")){}
      piece.eat(move1Row,move1Col);
      if(piece.player == 1){
        console.log("1");
        move1Row++;
      }else{
        console.log("2");
        move1Row--;
      }
      move1Col++;
      piece.placePiece(move1Row,move1Col);
      $(piece.div).unbind("click")
    }else if(game.board[move1Row][move1Col] != 0 && piece.canEatB == false){
      console.log("Two pieces in a row");
      piece.illegalMove()
    }else{
      piece.placePiece(move1Row,move1Col);
      $(piece.div).unbind("click")
    }
  }else{
    piece.illegalMove();
  }
}

function makeMoveLeft(move2Row,move2Col,piece){
  if(piece.isLegal(move2Row,move2Col)){
    if(piece.canEat(move2Row,move2Col,"left")){
      //if(piece.doubleEat(move2Row,move2Col,"left")){}
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
      piece.placePiece(move2Row,move2Col);
      $(piece.div).unbind("click")
    }else if(game.board[move2Row][move2Col] != 0 && piece.canEatB == false){
      console.log("Two pieces in a row");
    }else{
      piece.placePiece(move2Row,move2Col);
      $(this).unbind("click");
    }
  }else{
    piece.illegalMove();
  }
}


Piece.prototype.canEat = function(row,col,direction){
  var currentPlayer = this.player;
  var otherPlayer = game.board[row][col].player;
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
  if(otherRow > 7 || otherRow < 0){
    return false;
  }
  var otherSpace = game.board[otherRow][otherCol];
  if(otherSpace == 0 && otherPlayer != undefined && otherPlayer != currentPlayer){
    this.canEatB = true;
    return true;
  }else{
    this.canEatB = false;
    return false;
  }
}

Piece.prototype.eat = function(row,col){
  var piece = game.board[row][col];
  console.log("This is the piece in that is going to be eaten");
  console.log(piece);
  piece.removePiece();
  console.log(game.players);
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
  this.remove = true;
}

Piece.prototype.draw = function(num){
  var row = this.row+1;
  var col = this.col;
  var rowDiv = $("#"+row);
  this.div = rowDiv.children()[col+2];
  var piece = this;
  if(this.king == true){
    $(this.div).html('<span class="glyphicon glyphicon-record player' + this.player + '" aria-hidden="true"></span>');
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
