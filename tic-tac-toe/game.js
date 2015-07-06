var makePlayers = function(){
  var players = [];
  var player1 = new Player(true);
  var player2 = new Player(false);
  players.push(player1,player2);
  return players;
}

var game = {
  moves: [],
  board: [[0,0,0],[0,0,0],[0,0,0]],
  currentPlayer: null,
  currentPlayerNum: null,
  players: [],
  gameOver: false,
  currentMove: null,
  players: makePlayers(),
  runGame: function(num){
    if(this.currentPlayerNum == null){
        this.currentPlayer = this.players[0];
        this.currentPlayerNum = 1;
    }
    this.makeMove(num);
    this.updateBoard(num);
    this.checkStatus();
    if(this.gameOver){
      this.notifyGameOver();
    }else{
      this.nextPlayer();
    }
  },
  makeMove: function(num){
    var move = num;
    while(!this.legalMove(move)){
      var move = console.log("Move is illegal please chose another move");
    }
    switch(move){
      case 1:
        this.board[0][0] = this.currentPlayerNum;
        break;
      case 2:
        this.board[0][1] = this.currentPlayerNum;
        break;
      case 3:
        this.board[0][2] = this.currentPlayerNum;
        break;
      case 4:
        this.board[1][0] = this.currentPlayerNum;
        break;
      case 5:
        this.board[1][1] = this.currentPlayerNum;
        break;
      case 6:
        this.board[1][2] = this.currentPlayerNum;
        break;
      case 7:
        this.board[2][0] = this.currentPlayerNum;
        break;
      case 8:
        this.board[2][1] = this.currentPlayerNum;
        break;
      case 9:
        this.board[2][2] = this.currentPlayerNum;
        break;
      }
  },
  legalMove: function(move){
    switch(move){
      case 1:
        if(this.board[0][0] == 0){
          return true;
        }else{
          return false;
        }
        break;
      case 2:
        if(this.board[0][1] == 0){
          return true;
        }else{
          return false;
        }
        break;
      case 3:
        if(this.board[0][2] == 0){
          return true;
        }else{
          return false;
        }
        break;
      case 4:
        if(this.board[1][0] == 0){
          return true;
        }else{
          return false;
        }
        break;
      case 5:
        if(this.board[1][1] == 0){
          return true;
        }else{
          return false;
        }
        break;
      case 6:
        if(this.board[1][2] == 0){
          return true;
        }else{
          return false;
        }
        break;
      case 7:
        if(this.board[2][0] == 0){
          return true;
        }else{
          return false;
        }
        break;
      case 8:
        if(this.board[2][1] == 0){
          return true;
        }else{
          return false;
        }
        break;
      case 9:
        if(this.board[2][2] == 0){
          return true;
        }else{
          return false;
        }
        break;
    }
  },
  updateBoard: function(num){
    if(this.currentPlayerNum == 1){
      $("#" + num).html('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>');
    }else{
      $("#" + num).html('<span class="glyphicon glyphicon-adjust" aria-hidden="true"></span>');
    }
  },
  notifyGameOver: function(){
    console.log("Game Over");
  },
  checkStatus: function (){
    for(var i = 0; i < this.board.length; i++){
      for(var j = 0; j < this.board[0].length; j++){
        if(this.board[i][j] == 0){
          this.gameOver = false;
          return false;
        }
      }
    }
    this.gameOver = true;
    return true;
  },
  nextPlayer: function(){
    if(this.currentPlayerNum == 1){
      this.currentPlayer = this.players[1];
      this.currentPlayerNum = 2;
    }else{
      this.currentPlayer = this.players[0];
      this.currentPlayerNum = 1;
    }
  },
}

function Player(first) {
  this.currentPlayer = first;
  this.moves = [];
  this.winner = false;
}


$(document).ready(function(){
  $('#1').click(function(){
    game.runGame(1)
  });
  $('#2').click(function(){
    game.runGame(2)
  });
  $('#3').click(function(){
    game.runGame(3)
  });
  $('#4').click(function(){
    game.runGame(4)
  });
  $('#5').click(function(){
    game.runGame(5)
  });
  $('#6').click(function(){
    game.runGame(6)
  });
  $('#7').click(function(){
    game.runGame(7)
  });
  $('#8').click(function(){
    game.runGame(8)
  });
  $('#9').click(function(){
    game.runGame(9)
  });
});
