export function setPlayerNames() {
  const player1NameInput = document.querySelector('.one.name')
  const player2NameInput = document.querySelector('.two.name')
  const player3NameInput = document.querySelector('.three.name')
  let player1name = player1NameInput.value
  if (player1name === '' || player1name === null) {
    player1name = 'Player 1'
  }
  player1 = createPlayer(player1name, 1)
  allPlayers.push(player1)
  let player2name = player2NameInput.value
  if (player2name === '' || player2name === null) {
    player2name = 'Player 2'
  }
  player2 = createPlayer(player2name, 2)
  allPlayers.push(player2)
  if (player3NameInput !== null) {
    let player3name = player3NameInput.value
    if (player3name === '' || player3name === null) {
      player3name = 'Player 3'
    }
    player3 = createPlayer(player3name, 3)
    allPlayers.push(player3)
  }
}

export function determineWinner() {
  const scoreArr = allPlayers.sort((a, b) => {
    return b.roundScore - a.roundScore     // descending order so highest score comes first
  })
  if (checkTie(scoreArr, 'roundScore') === false) {
    console.log('winner: ' + scoreArr[0].playerNumber)
    return scoreArr[0].playerNumber 
  } else {
    const timeArr = allPlayers.sort((a, b) => {
      return a.roundTime - b.roundTime     // ascending order so shortest time comes first
    })
    if (checkTie(timeArr, 'roundTime') === false) {
      console.log('winner: ' + timeArr[0].playerNumber)
      return timeArr[0].playerNumber 
    } else {
      // identify tied players
    }
  }
}

function checkTie(inputArr, targetProperty) {
  for (const item of inputArr) {
    const firstIndex = inputArr.findIndex((target) => {
      return target[targetProperty] === item[targetProperty]
    })
    const lastIndex = inputArr.findLastIndex((target) => {
      return target[targetProperty] === item[targetProperty]
    })
    if (firstIndex === lastIndex) {
      console.log('no tie')
      return false
    } else if (firstIndex !== lastIndex) {
      console.log('tie !!!!')
      return true
    }
  }
}
  // if top 2 scores AND times are the same, make it a tie (multiple winners)
  // if all 3 scores AND times are the same, make it a tie (multiple winners)
  // if all 3 have a score of 0, show 'fail' msg, no players win

  // OLD VERSION
  // if (player1.roundScore > player2.roundScore) {
  //   player1.incrementScore()
  //   return 'player1'
  // } else if (player1.roundScore < player2.roundScore) {
  //   player2.incrementScore()
  //   return 'player2'
  // } else if (
  //   player1.roundScore === player2.roundScore &&
  //   player1.roundScore > 0 &&
  //   player2.roundScore > 0
  // ) {
  //   if (player1.roundTime < player2.roundTime) {
  //     player1.incrementScore()
  //     return 'player1'
  //   } else if (player1.roundTime > player2.roundTime) {
  //     player2.incrementScore()
  //     return 'player2'
  //   } else if (player1.roundTime === player2.roundTime) {
  //     return 'tie'
  //   }
  // } else {
  //   return 'zero'
  // }

export function createPlayer(playerName, playerNumber) {
  const name = playerName
  let _score = 0

  function incrementScore() {
    _score++
  }

  return {
    get roundScore() {
      return this._roundScore
    },
    get roundTime() {
      return this._roundTime
    },
    set roundScore(currentScore) {
      this._roundScore = currentScore
    },
    set roundTime(timeTaken) {
      this._roundTime = timeTaken
    },
    get score() {
      return _score
    },
    name,
    incrementScore,
    playerNumber
  }
}

let player1
let player2
let player3
export const allPlayers = []
