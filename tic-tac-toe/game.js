var game = {
  moves: [],
  board: [[0,0,0],[0,0,0],[0,0,0]],
  currentPlayer: null,
  currentPlayerNum: null,
  players: [],
  gameOver: false,
  currentMove: null,
  players: makePlayers(),
  winningCords: null,
  gameLocked: false,
  runGame: function(num){
    if(this.currentPlayerNum == null){
        this.currentPlayer = this.players[0];
        this.currentPlayerNum = 1;
    }
    if(this.legalMove(num)){
      if(this.gameOver){
        this.notifyGameOver();
      }else{
        this.makeMove(num);
        this.updateBoard(num);
        this.checkStatus();
        if(this.gameOver){
          this.notifyGameOver();
        }else{
          this.nextPlayer();
        }
      }
    }else{
      this.notifyIllegalMove();
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
  notifyGameOver: function(){
    if(this.gameLocked){
      var header = '<h4 class="modal-title" id = "modalHeader"> The Game is Locked. It is a tie.</h4>'
      var body = '<img src = "img/padlock.png"/>'
    }else{
      var header = '<h4 class="modal-title" id = "modalHeader"> Player ' + this.currentPlayerNum +' has won.</h4>'
      var body = '<img src = "img/winner.jpg"/>'
      this.makeWinningCordsGlow();
    }
    $("#modalHeader").html(header);
    $("#modalBody").html(body);
    $('#modalFooter').html('<a class ="btn" href ="game.html"><button class="btn btn-primary">Play again</button></a>');
    $('#myModal').modal('show');
  },
  makeWinningCordsGlow: function(){
    for(var i = 0; i < this.winningCords.length; i++){
      var coord = this.winningCords[i];
      var num = coord[0]*3+1+coord[1];
      $("#" + num).addClass("won");
    }
  },
  makeMove: function(num){
    var move = num;
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
  updateBoard: function(num){
    if(this.currentPlayerNum == 1){
      $("#" + num).html('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>');
    }else{
      $("#" + num).html('<span class="glyphicon glyphicon-adjust" aria-hidden="true"></span>');
    }
  },
  checkStatus: function (){
    for(var i = 0; i < this.board.length; i++){
      for(var j = 0; j < this.board[0].length; j++){
        var threeInaRow = this.checkThreeInaRow(i,j);
        var gameLocked = this.checkGameLocked();
        if(threeInaRow){
          this.gameOver = true;
          return true;
        }else if(gameLocked){
          this.gameOver = true;
          this.gameLocked = true;
          return true;
        }
      }
    }
    this.gameOver = false;
    return false;
  },
  checkThreeInaRow: function(row,col){
    var right = this.checkRight(row,col);
    var down = this.checkDown(row,col);
    var num = this.board[row][col]
    var diagnol = this.checkDiagnol(row,col);
    if((right == true || down == true || diagnol == true) && num != 0){
      return true
    }else{
      return false;
    }
  },
  checkRight: function(row,col){
    var num = this.board[row][col];
    if(col + 1 > 2 || col + 2 > 2){
      return false;
    }else{
      var secondNum = this.board[row][col+1];
      var thirdNum = this.board[row][col+2];
      if(num == secondNum && num == thirdNum){
        this.winningCords = [[row,col],[row,col+1],[row,col+2]];
        return true;
      }else{
        return false;
      }
    }
  },
  checkDown: function(row,col){
    var num = this.board[row][col];
    if(row + 1 > 2 || row + 2 > 2){
      return false;
    }else{
      var secondNum = this.board[row+1][col];
      var thirdNum = this.board[row+2][col];
      if(num == secondNum && num == thirdNum){
        this.winningCords = [[row,col],[row+1,col],[row+2,col]];
        return true;
      }else{
        return false;
      }
    }
  },
  checkDiagnol: function(row,col){
    var num = this.board[row][col];
    if(row == 0 && col == 0){
      var secondNum = this.board[row+1][col+1];
      var thirdNum = this.board[row+2][col+2];
      if(num == secondNum && num == thirdNum){
        this.winningCords = [[row,col],[row+1,col+1],[row+2,col+2]];
        return true;
      }else{
        return false;
      }
    }else if(row == 0 && col == 2){
      var secondNum = this.board[row+1][col-1];
      var thirdNum = this.board[row+2][col-2];
      if(num == secondNum && num == thirdNum){
        this.winningCords = [[row,col],[row+1,col-1],[row+2,col-2]]
        return true;
      }else{
        return false;
      }
    }else{
      return false;
    }
  },checkGameLocked: function(){
    var board = this.board
    for(var i = 0; i < board.length;i++){
      for(var j = 0; j < board[0].length;j++){
        if(board[i][j] == 0){
          return false
        }
      }
    }
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
    this.updateCurrentPlayer();
  },
  notifyIllegalMove: function(){
    $("#modalHeader").html('<h4 class="modal-title" id = "modalHeader">Illegal Move</h4>');
    $("#modalBody").html('<img src = "img/illegalMove.jpg"/><h4 class="modal-title" id = "modalHeader">The other player has already played there.</h4>');
    $('#modalFooter').html("")
    $('#myModal').modal('show');
  },
  updateCurrentPlayer: function(){
    $("#currentPlayer").html("<h1> Player " + this.currentPlayerNum + "'s Turn </h1>");
  }
}

function Player(first) {
  this.currentPlayer = first;
  this.moves = [];
  this.winner = false;
}

function makePlayers(){
  var players = [];
  var player1 = new Player(true);
  var player2 = new Player(false);
  players.push(player1,player2);
  return players;
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
