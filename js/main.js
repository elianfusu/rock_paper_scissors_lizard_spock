/* Create the three groups */
var group0 = new group('group0');
var group1 = new group('group1');
var group2 = new group('group2');
var groupFinal = new group('groupFinal');

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
