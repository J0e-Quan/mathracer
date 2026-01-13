/*
GAME MANAGER (IIFE, assign to const during testing)
method for randomly generating question (FORMAT: x (operator) y = ?)
getStartTime method that runs performance.now()
getEndTime method that runs performance.now()
calcRoundTime that takes endTime - startTime
addRoundScore that increments roundScore
declare private roundScore and roundTime vars with getters
*/

/*
PLAYER MANAGER (IIFE, assign to const during testing)
Factory Function for player, make 2 players with name const, score vars, roundScore vars, roundTime vars
event listener for submit button of player names triggers selection of first player
event listener for both player icons, whichever clicked goes first
*/

/*
DISPLAY MANAGER (IIFE, assign to const during testing)
WhoGoesFirst method adjusts ui for selection of first player
Upon selection, show game content and set firstPlayer var to selected player
For main gameplay, show current player details, number of questions and current question
Trigger GameManager to get timeStart with performance.now()
Upon game end, remove everything and show results screen with current player score and time and next player darkened 
Repeat for next player...
Once both rounds done, results screen shows winner and score
event listener for button to play again
*/
