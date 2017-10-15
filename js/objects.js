/* Player object */
function player(name, group) {
  this.name = name;
  this.group = group;
  this.nrWins = 0;
  this.history = [];

  this.addToHistory = function(opponent, result) {
    this.history.push({
      'opponent': opponent.name,
      'winner': result
    })
  };
}

/* Session object */
function session(opponent1, opponent2) {
  this.opponent1 = opponent1;
  this.opponent2 = opponent2;
  this.history = [];

  this.addToHistory = function(winner) {
    this.history.push({
      'opponent1': opponent1.name,
      'opponent2': opponent2.name,
      'winner': winner.name
    });
  }

  this.playSession = function() {
    do {
      var op1Choice = choices[Math.floor(Math.random() * 5)];
      var op2Choice = choices[Math.floor(Math.random() * 5)];

      if (op1Choice.name === op2Choice.name) {
        this.addToHistory('Deuce');
        opponent1.addToHistory(opponent2, 'Deuce');
        opponent2.addToHistory(opponent1, 'Dence');
      }
    }
    while (op1Choice.name === op2Choice.name)

    console.log(op1Choice.name + " vs " + op2Choice.name);

    var winnerID = getWinnerID (op1Choice, op2Choice);
    if (winnerID === 1) {
      opponent1.nrWins++;
      winner = opponent1;
    } else if (winnerID === 2) {
      opponent2.nrWins++;
      winner = opponent2;
    }

    opponent1.addToHistory(opponent2, winner.name);
    opponent2.addToHistory(opponent1, winner.name);
    this.addToHistory(winner.name);

    return winner;
  }
}


/* Group object */
function group(name) {
  this.name = name;
  this.history = [];
  this.players = [];
  this.sessions = {
    "match0" : [],
    "match1" : [],
    "match2" : []
  };

  this.addPlayers = function() {
    for (var i = 0; i < 3; i++) {
      this.players.push(new player("player" + i + "_" + this.name, this.name));
    }
  }

  this.addToHistory = function(opponent1, opponent2, winner) {
    this.history.push({
      'opponent1': opponent1.name,
      'opponent2': opponent2.name,
      'winner': winner.name
    });
  }
}
