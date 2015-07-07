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

Piece.prototype.draw = function(){
  var html = '<div id =' + this.id +'><img id = "img' + this.id +'" src ="img/player'+this.player+'.png"/></div>';
  $("#pieces").append(html)
}

Piece.prototype.scale = function(){
  var piece = $("#img"+this.id);
  console.log(piece)
  var row = this.row;
  var col = this.col;
  var boardWidth = $(window).width()/2;
	var boardHeight = $(window).height();
  var pieceHeight = boardHeight/11;
  var pieceWidth = boardWidth/11;
  var boardCellWidth = boardWidth/9;
  var boardCellHeight = boardHeight/9;
  var top = .95*pieceHeight + boardCellHeight * row;
  var left = 6.20*pieceWidth + boardCellWidth * col;
  piece.css({"position": "absolute","width": pieceWidth, "height": pieceHeight, "top": top, "left": left});
}


function Player(home,num){
  this.home = home;
  this.pieces = makePieces(num);
  this.num = num;
  this.winner = false;
}

Player.prototype.play = function(){
  var pieces = this.pieces
  var pieceImage1 = $("#"+pieces[0].id);
  pieceImage1.click(function(){
    console.log(1);
  });
  var pieceImage2 = $("#"+pieces[1].id);
  pieceImage2.click(function(){
    console.log(2);
  });
  var pieceImage3 = $("#"+pieces[2].id);
  pieceImage3.click(function(){
    console.log(3);
  });
  var pieceImage4 = $("#"+pieces[3].id);
  pieceImage4.click(function(){
    console.log(4);
  });
  var pieceImage5 = $("#"+pieces[4].id);
  pieceImage5.click(function(){
    console.log(5);
  });
  var pieceImage6 = $("#"+pieces[5].id);
  pieceImage6.click(function(){
    console.log(6);
  });
  var pieceImage7 = $("#"+pieces[6].id);
  pieceImage7.click(function(){
    console.log(7);
  });
  var pieceImage8 = $("#"+pieces[7].id);
  pieceImage8.click(function(){
    console.log(8);
  });
  var pieceImage9 = $("#"+pieces[8].id);
  pieceImage9.click(function(){
    console.log(9);
  });
  var pieceImage10 = $("#"+pieces[9].id);
  pieceImage10.click(function(){
    console.log(10);
  });
  var pieceImage11 = $("#"+pieces[10].id);
  pieceImage11.click(function(){
    console.log(11);
  });
  var pieceImage12 = $("#img"+pieces[11].id);
  pieceImage12.click(function(){
    $(this).addClass("glow");
  });

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
  drawPieces: function(){
    var player1Pieces = this.players[0].pieces;
    var player2Pieces = this.players[1].pieces;
    for(var i = 0; i < player1Pieces.length;i++){
      var piece1 = player1Pieces[i];
      var piece2 = player2Pieces[i];
      piece1.draw();
      piece1.scale();
      piece2.draw();
      piece2.scale();

    }
  }
}


$(document).ready(function(){
	window.resizeTo(1000,1000)
  var windowWidth = $(window).width()/2;
	var windowHeight = $(window).height();
  var board = $("#boardImage");
	board.css({"width":windowWidth.toString(),"height":windowHeight.toString()});
  game.placePieces();
  game.drawPieces();
  game.players[0].play();
});
