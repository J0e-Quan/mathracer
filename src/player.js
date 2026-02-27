import { hideInitial } from "./display.js"
export function setPlayerNames() {
  const player1NameInput = document.querySelector('.one.name')
  const player2NameInput = document.querySelector('.two.name')
  player1name = player1NameInput.value
  if (player1name === '' || player1name === null) {
    player1name = 'Player 1'
  }
  player2name = player2NameInput.value
  if (player2name === '' || player2name === null) {
    player2name = 'Player 2'
  }
  player1 = createPlayer(player1name)
  player2 = createPlayer(player2name)
  hideInitial()
}

export function determineWinner() {
  if (player1.roundScore > player2.roundScore) {
    return 'player1'
  } else if (player1.roundScore < player2.roundScore) {
    return 'player2'
  } else if (player1.roundScore === player2.roundScore) {
    if (player1.roundTime < player2.roundTime) {
      return 'player1'
    } else if (player1.roundTime > player2.roundTime) {
      return 'player2'
    } else if (player1.roundTime === player2.roundTime) {
      return 'tie'
    }
  }
}

export function createPlayer(playerName) {
  let score = 0
  const name = playerName

  function incrementScore() {
    score = score++
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
      return this._score
    },
    name,
    incrementScore
  }
}

let player1name
let player2name
export let player1
export let player2
