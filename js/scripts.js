//Set up the choices with what they can beat
//This is a hash table of objects you can referecne by name
var choices  =  {rock : {name: "Rock", defeats: ["scissors","lizard"]},
                 paper: {name: "Paper", defeats: ["rock", "spock"]},
                 scissors: {name: "Scissors", defeats: ["paper", "lizard"]},
                 lizard: {name: "Lizard", defeats:["paper","spock"]},
                 spock: {name: "Spock", defeats:["scissors","rock"]}
                };


//Get the computers choice
var computerChoice = Math.random();
if (computerChoice < 0.2) {
    computerChoice = "rock";
} else if (computerChoice <= 0.4) {
    computerChoice = "paper";
} else if (computerChoice <= 0.6) {
    computerChoice = "scissors";
} else if (computerChoice <= 0.8) {
    computerChoice = "lizard";
} else {
    computerChoice = "spock";
}


//Get the users choice, normalising to lower case
var userChoice = prompt("Do you choose rock, paper, scissors, lizard, or spock?").toLowerCase();

alert("The computer chose " + computerChoice);

//Check for a tie
if(computerChoice == userChoice){
    alert("It's a tie");
//Check for a valid choice
}else if(choices[userChoice] === undefined){
    alert("Invalid Choice");
}else{
    //Get the chosen one as an object
    userChoice = choices[userChoice];



    //Check For a win
    /*var victory = false;
    for(var i = 0; i < userChoice.defeats.length; i++){
        if(computerChoice == userChoice.defeats[i])
        {
            victory = true;
            break;
        }
    }*/

    //Improved check, inspired by Mke Spa Guy
    var victory = userChoice.defeats.indexOf(computerChoice) > -1;

    //Display result
    if(victory) {
        alert("Vitory! " + userChoice.name + " wins!")
    }else{
        alert("Defeat, " + computerChoice + " wins!");
    }
}
