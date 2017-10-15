var group0 = null;
var group1 = null;
var group2 = null;
var groupFinal = null;

function playTournament() {
  /* Create the three groups */
  group0 = new group('group0');
  group1 = new group('group1');
  group2 = new group('group2');
  groupFinal = new group('groupFinal');

  group0.addPlayers();
  group1.addPlayers();
  group2.addPlayers();

  var group0Winner = playChampionship(group0);
  var group1Winner = playChampionship(group1);
  var group2Winner = playChampionship(group2);

  groupFinal.players.push(group0Winner);
  groupFinal.players.push(group1Winner);
  groupFinal.players.push(group2Winner);

  var tournamentWinner = playChampionship(groupFinal);
  console.log("Tournament Winner is " + tournamentWinner.name);

  var winner = document.getElementById('winner');
  winner.innerHTML = tournamentWinner.name;

}

function getStats(group, player) {

  if(group0 == null) {
    alert('In order to have statistics, you need to simulate a tournament first!');
    return;
  }

  var showStats = document.getElementById('stats');
  //TODO: check if we have a winner; otherwise -> no showStats
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
