export function setPlayerNames() {
  const player1NameInput = document.querySelector('.one.name')
  const player2NameInput = document.querySelector('.two.name')
  const player3NameInput = document.querySelector('.three.name')
  let player1name = player1NameInput.value
  if (player1name === '' || player1name === null) {
    player1name = 'Player 1'
  }
  const player1 = createPlayer(player1name, 1)
  allPlayers.push(player1)
  let player2name = player2NameInput.value
  if (player2name === '' || player2name === null) {
    player2name = 'Player 2'
  }
  const player2 = createPlayer(player2name, 2)
  allPlayers.push(player2)
  if (player3NameInput !== '' && player3NameInput !== null) {
    let player3name = player3NameInput.value
    if (player3name === '' || player3name === null) {
      player3name = 'Player 3'
    }
    const player3 = createPlayer(player3name, 3)
    allPlayers.push(player3)
  }
}

export function determineWinner() {
  const winner = []
  const scoreArr = allPlayers.toSorted((a, b) => {
    return b.roundScore - a.roundScore     // descending order so highest score comes first
  })
  if (checkTie(scoreArr, 'roundScore') === false) {
    winner.push(scoreArr[0].playerNumber)
    scoreArr[0].incrementScore()
  } else {
    const timeArr = allPlayers.toSorted((a, b) => {
      return a.roundTime - b.roundTime     // ascending order so shortest time comes first
    })
    if (checkTie(timeArr, 'roundTime') === false) {
      winner.push(timeArr[0].playerNumber)
      timeArr[0].incrementScore()
    } else {
      // in a tie, the highest player in scoreArr and timeArr will be the same player
      const highestScore = scoreArr[0].roundScore
      const highestTime = timeArr[0].roundTime
      if (allPlayers.filter((player) => {
        return player.roundScore > 0
      }).length === 0) {
        return winner
      }
      allPlayers.forEach((player) => {
        if (player.roundScore === highestScore && player.roundTime === highestTime) {
          winner.push(player.playerNumber)
          player.incrementScore()
        }
      })
    }
  }
  return winner
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
      return false
    } else if (firstIndex !== lastIndex) {
      return true
    }
  }
}
  // if top 2 scores AND times are the same, make it a tie (multiple winners)
  // if all 3 scores AND times are the same, make it a tie (multiple winners)
  // if all 3 have a score of 0, show 'fail' msg, no players win

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

export const allPlayers = []
