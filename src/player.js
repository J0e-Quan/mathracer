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
    // descending order so highest score comes first
    return b.roundScore - a.roundScore     
  })
  if (checkTie(scoreArr, 'roundScore') === false) {
    console.log("win by scoring highest: " + scoreArr[0].playerNumber)
    winner.push(scoreArr[0].playerNumber)
    scoreArr[0].incrementScore()
  } else {
      // if there are identical scores, get best scoring player first to prioritise score
      const bestScore = scoreArr[0].roundScore
      // if all players score 0, show easter egg msg and skip checks
      if (bestScore === 0) {
        return winner
      }
      // filter out only players with the same best score then sort them by time
      const tiedScore = (allPlayers.filter((player) => {
        return player.roundScore === bestScore
      })).sort((a, b) => {
        return a.roundTime - b.roundTime
      })
      // push players with the same best score and best time to winners array
      const bestTime = tiedScore[0].roundTime
      tiedScore.forEach((player) => {
        if (player.roundTime === bestTime) {
          console.log("win by scoring fastest and highest: "+player.playerNumber)
          winner.push(player.playerNumber)
        }
      })
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
