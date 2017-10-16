// Based on https://stackoverflow.com/questions/22623331/rock-paper-scissors-lizard-spock-in-javascript
var choices  =  [
  {
    name: "rock", defeats: ["scissors","lizard"]
  },
  {
    name: "paper", defeats: ["rock", "spock"]
  },
  {
    name: "scissors", defeats: ["paper", "lizard"]
  },
  {
    name: "lizard", defeats:["paper","spock"]
  },
  {
    name: "spock", defeats:["scissors","rock"]
  }
];

function getWinnerID(op1Choice, op2Choice) {
  for (var i = 0; i < choices.length; i++) {
    if (choices[i].name === op1Choice.name) {
      if (choices[i].defeats.indexOf(op2Choice.name) > -1) {
        return 1;
      }
      break;
    }
  }

  for (var i = 0; i < choices.length; i++) {
    if (choices[i].name === op2Choice.name) {
      if (choices[i].defeats.indexOf(op1Choice.name) > -1) {
        return 2;
      }
      break;
    }
  }
}

/* Used for starting the group championship, 3 matches * (max 3 sessions each) */
function playChampionship(group) {
  var players = group.players;
  var opponent1 = players[Math.floor(Math.random() * 3)];

  do {
    var opponent2 = players[Math.floor(Math.random() * 3)];
  }
  while(opponent1.name === opponent2.name)

  log += "#-- First match of group " + group.name + " --#\n";
  log += " --- " + opponent1.name + " vs " + opponent2.name + " ---\n";

  var session0 = new session(opponent1, opponent2);
  var firstSessionWinner = session0.playSession(opponent1, opponent2, group, "session0");
  log += "* First session winner is " + firstSessionWinner.name + " *\n";

  for (var i = 0; i < 3; i++) {
    if (players[i].name !== firstSessionWinner.name) {
      opponent1 = players[i];
      break;
    }
  }

  for (var i = 0; i < 3; i++) {
    if (players[i].name !== firstSessionWinner.name && players[i].name !== opponent1.name) {
      opponent2 = players[i];
      break;
    }
  }

  log += "#-- Second match of group " + group.name + " --#\n";
  log += " --- " + opponent1.name + " vs " + opponent2.name + " ---\n";
  var session1 = new session(opponent1, opponent2);
  var secondSessionWinner = session1.playSession(opponent1, opponent2, group, "session1");
  log += "* Second session winner is " + secondSessionWinner.name + " *\n";

  log += "#-- Third match of group " + group.name + " --#\n";
  log += " --- " + firstSessionWinner.name + " vs " + secondSessionWinner.name + " ---\n";
  var session2 = new session(firstSessionWinner, secondSessionWinner);
  var groupWinner = session2.playSession(firstSessionWinner, secondSessionWinner, group, "session2");
  log += "** Group winner is " + groupWinner.name + " **\n";

  return groupWinner;
}

/* Used for obtaining the match winner */
this.playMatch = function(opponent1, opponent2) {
  do {
    var op1Choice = choices[Math.floor(Math.random() * 5)];
    var op2Choice = choices[Math.floor(Math.random() * 5)];

    log += opponent1.name + " picks " + op1Choice.name + ", " + opponent2.name + " picks " + op2Choice.name + "\n";

    if (op1Choice.name === op2Choice.name) {
      opponent1.addToHistory(opponent2, 'Deuce');
      opponent2.addToHistory(opponent1, 'Dence');
    }
  }
  while (op1Choice.name === op2Choice.name)

  var winnerID = getWinnerID (op1Choice, op2Choice);
  if (winnerID === 1) {
    opponent1.nrWins++;
    log += opponent1.name + " wins\n";
    winner = opponent1;
  } else if (winnerID === 2) {
    opponent2.nrWins++;
    log += opponent2.name + " wins\n";
    winner = opponent2;
  }

  opponent1.addToHistory(opponent2, winner.name);
  opponent2.addToHistory(opponent1, winner.name);

  return winner;
}
