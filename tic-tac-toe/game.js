var game = {
  moves: [],
  board: [[0,0,0],[0,0,0],[0,0,0]],
  currentPlayer: null,
  currentPlayerNum: null,
  players: [],
  gameOver: false,
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
  nextPlayer: function(){
    if(this.currentPlayerNum == 1){
      this.currentPlayer = this.players[1];
      this.currentPlayerNum = 2;
    }else{
      this.currentPlayer = this.players[0];
      this.currentPlayerNum = 1;
    }
  },
  makeMove: function(){
    var move = parseInt(prompt("Please make move"));
    while(!this.legalMove(move)){
      var move = parseInt(prompt("That was an illegal move. Please chose again"));
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
  runGame: function(){
    var i = 0;
    var gameOver = false
    while(!this.gameOver){
      var player1 = new Player(true);
      var player2 = new Player(false);
      this.players.push(player1);
      this.players.push(player2);
      if(this.currentPlayerNum == null){
        this.currentPlayer = player1;
        this.currentPlayerNum = 1;
      };
      this.checkStatus()
      if(this.gameOver){
        break
      }else{
        this.makeMove();
        this.nextPlayer();
      }
    }
  }
}


function Player(first) {
  this.currentPlayer = first;
  this.moves = [];
  this.winner = false;
}

game.runGame()
