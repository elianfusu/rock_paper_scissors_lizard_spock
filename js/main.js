var group0 = null;
var group1 = null;
var group2 = null;
var groupFinal = null;
var log = "";

function playTournament() {
  /* Create the three groups */
  log = "";

  group0 = new group('group0');
  group1 = new group('group1');
  group2 = new group('group2');
  groupFinal = new group('groupFinal');

  group0.addPlayers();
  group1.addPlayers();
  group2.addPlayers();

  log += "## First group matches ##\n";
  var group0Winner = playChampionship(group0);
  log += "## Second group matches ##\n";
  var group1Winner = playChampionship(group1);
  log += "## Third group matches ##\n";
  var group2Winner = playChampionship(group2);

  groupFinal.players.push(group0Winner);
  groupFinal.players.push(group1Winner);
  groupFinal.players.push(group2Winner);

  log += "## Final matches ##\n";
  var tournamentWinner = playChampionship(groupFinal);
  log += "**** Tournament Winner is " + tournamentWinner.name + ' ****\n';

  var winner = document.getElementById('winner');
  winner.innerHTML = tournamentWinner.name;

  var insertLog = document.getElementById('logshow');
  insertLog.innerHTML = log;
}

function getStats(group, player) {
  if(group0 == null) {
    alert('In order to have statistics, you need to simulate a tournament first!');
    return;
  }

  var showStats = document.getElementById('stats');
  if(group === 'group0') {
    showStats.innerHTML = group0.players[player[player.length - 1]].nrWins;
  }
  if(group === 'group1') {
    showStats.innerHTML = group1.players[player[player.length - 1]].nrWins;
  }
  if(group === 'group2') {
    showStats.innerHTML = group2.players[player[player.length - 1]].nrWins;
  }
}

function getHighestWRate() {

  if(group0 == null) {
    alert('In order to have statistics, you need to simulate a tournament first!');
    return;
  }

  var highestWRate = document.getElementById('best-winning-rate');

  var highestWR = {}
  var max = 0;
  var group = null;

  for(var j = 0; j < 3; j++) {
    if(j == 0) {
      group = group0;
    } else if(j == 1) {
      group = group1;
    } else if(j == 2) {
      group = group2;
    }
    for(var i = 0; i < 3; i++) {

      var WR = group.players[i].nrWins / group.players[i].history.length;
      if(WR > max) {
        max = WR;
        highestWR = {
          "player": group.players[i].name,
          "nrWins": group.players[i].nrWins,
          "nrMatches": group.players[i].history.length,
          "WR": WR
        }
      }
    }
  }

  highestWRate.innerHTML = highestWR.player + ", with " + highestWR.nrWins + " wins out of " + highestWR.nrMatches + " matches";
}

function getLowestWRate() {

  if(group0 == null) {
    alert('In order to have statistics, you need to simulate a tournament first!');
    return;
  }

  var highestWRate = document.getElementById('worst-winning-rate');

  var lowestWR = {}
  var min = 1;
  var group = null;

  for(var j = 0; j < 3; j++) {
    if(j == 0) {
      group = group0;
    } else if(j == 1) {
      group = group1;
    } else if(j == 2) {
      group = group2;
    }
    for(var i = 0; i < 3; i++) {

      var WR = group.players[i].nrWins / group.players[i].history.length;
      if(WR < min) {
        min = WR;
        highestWR = {
          "player": group.players[i].name,
          "nrWins": group.players[i].nrWins,
          "nrMatches": group.players[i].history.length,
          "WR": WR
        }
      }
    }
  }

  highestWRate.innerHTML = highestWR.player + ", with " + highestWR.nrWins + " wins out of " + highestWR.nrMatches + " matches";
}
