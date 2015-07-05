var game = {
  moves: [],
  board: [[],[],[]],
  currentPlayer: null,
  currentPlayerNum: null,
  players: [],
  gameOver: false,
  checkStatus: function (board){
    if(this.board[0].length == 3 && this.board[1].length == 3 && this.board[2] == 3){
      return true;
    }else{
      return false;
    }
  },
  checkMove: function(move){
  },
  nextPlayer: function(){
    console.log("Next player function " + this.currentPlayerNum);
    if(this.currentPlayerNum == 1){
      this.currentPlayer = this.players[1];
      this.currentPlayerNum = 2;
    }else{
      this.currentPlayer = this.players[0];
      this.currentPlayerNum = 1;
    }
  },
  runGame: function(){
    var i = 0;
    while(!this.gameOver){
      var player1 = new Player(true);
      var player2 = new Player(false);
      this.players.push(player1);
      this.players.push(player2);
      if(this.currentPlayerNum == null){
        this.currentPlayer = player1;
        this.currentPlayerNum = 1;
      }
      this.currentPlayer.makeMove(this.board)
      this.checkStatus()
      this.nextPlayer()
      i++;
      if(i == 3){
        this.gameOver = true;
      }
    }
  }
}


function Player(first) {
  this.currentPlayer = first;
  this.moves = [];
  this.winner = false;
  this.makeMove = function(board){
    var move = prompt("Please make move");
    switch(move){
      case 1:
        board[0][0] = 1;
        break;
      case 2:
        board[0][1] = 1;
        break;
      case 3:
        board[0][2] = 1;
        break;
      case 4:
        board[1][0] = 1;
        break;
      case 5:
        board[1][1] = 1;
        break;
      case 6:
        board[1][2] = 1;
        break;
      case 7:
        board[2][0] = 1;
        break;
      case 8:
        board[2][1] = 1;
        break;
      case 9:
        board[2][2] = 1;
        break;
    }
  };
}

game.runGame()
