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

  var firstMatchWinner = playMatch(opponent1, opponent2, group, "match0");
  console.log("First match winner is " + firstMatchWinner.name);

  for (var i = 0; i < 3; i++) {
    if (players[i].name !== firstMatchWinner.name) {
      opponent1 = players[i];
      break;
    }
  }

  for (var i = 0; i < 3; i++) {
    if (players[i].name !== firstMatchWinner.name && players[i].name !== opponent1.name) {
      opponent2 = players[i];
      break;
    }
  }

  var secondMatchWinner = playMatch(opponent1, opponent2, group, "match1");
  console.log("Second match winner is " + secondMatchWinner.name);

  var groupWinner = playMatch(firstMatchWinner, secondMatchWinner, group, "match2");
  console.log("Group winner is " + groupWinner.name);

  return groupWinner;
}

/* Used for obtaining the match winner */
function playMatch(opponent1, opponent2, group, matchNumber) {

  console.log('Playing ' + opponent1.name + ' vs ' + opponent2.name);

  var nrWinsOp1 = 0;
  var nrWinsOp2 = 0;

  while (nrWinsOp1 < 2 && nrWinsOp2 < 2) {
    var session1 = new session(opponent1, opponent2);
    group.sessions[matchNumber].push(session);

    var winner = session1.playSession(opponent1, opponent2);
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
}
