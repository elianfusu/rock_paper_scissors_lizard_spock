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

  this.playSession = function(opponent1, opponent2, group, matchNumber) {

    var nrWinsOp1 = 0;
    var nrWinsOp2 = 0;

    while (nrWinsOp1 < 2 && nrWinsOp2 < 2) {

      var winner = playMatch(opponent1, opponent2);
      if (winner.name === opponent1.name) {
        nrWinsOp1++;
      } else {
        nrWinsOp2++;
      }
    }

    if (nrWinsOp1 > nrWinsOp2) {
      group.addToHistory(opponent1, opponent2, opponent1);
      return opponent1;
    } else {
      group.addToHistory(opponent1, opponent2, opponent2);
      return opponent2;
    }
  };
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
