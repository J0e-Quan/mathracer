import * as icons from './icons.js'
import {
  removeInitialButtons,
  removeGameplayButtons,
  initGameplayButtons,
  detectNextPlayer,
  detectNextRound
} from './input.js'
import { determineWinner, allPlayers } from './player.js'
const tutorialBtn = document.querySelector('.tutorial-button')
const initial = document.querySelector('.initial')

export function addPlayerForm() {
  const player = document.querySelector('.player')
  const playerTemplate = document.querySelector('.player.two')
  const player3 = playerTemplate.cloneNode(true)
  player3.classList.remove('two')
  player3.classList.add('three')
  const player3Icon = player3.querySelector('.icon')
  player3Icon.classList.remove('two')
  player3Icon.classList.add('three')
  const player3Name = player3.querySelector('.name')
  player3Name.classList.remove('two')
  player3Name.classList.add('three')
  player3Name.placeholder = "Player 3's name"
  player3Name.value = ''
  player.appendChild(player3)
}

export function removePlayerForm() {
  const player3 = document.querySelector('.player.three')
  player3.remove()
}

export function hideInitial() {
  removeInitialButtons()
  tutorialBtn.remove()
  initial.remove()
}
export function newGame(currentPlayerIndex, totalQuestions) {
  const currentPlayerName = allPlayers[currentPlayerIndex].name
  const content = document.querySelector('.content')
  const game = document.createElement('div')
  game.classList.add('game')
  const numpad = document.createElement('div')
  numpad.classList.add('numpad')
  const iconArr = [
    icons.nineBtn,
    icons.eightBtn,
    icons.sevenBtn,
    icons.sixBtn,
    icons.fiveBtn,
    icons.fourBtn,
    icons.threeBtn,
    icons.twoBtn,
    icons.oneBtn,
    icons.submitBtn,
    icons.zeroBtn,
    icons.backspaceBtn
  ]
  iconArr.forEach((src, index) => {
    const numpadBtn = document.createElement('button')
    if (index === 11) {
      numpadBtn.dataset.action = 'backspace'
    } else if (index === 9) {
      numpadBtn.dataset.action = 'submit'
    } else if (index === 10) {
      numpadBtn.dataset.action = '0'
    } else {
      numpadBtn.dataset.action = 9 - index
    }
    const icon = document.createElement('img')
    icon.src = src
    numpadBtn.classList.add('numpadBtn')
    icon.classList.add('numpadBtn-icon')
    numpadBtn.appendChild(icon)
    numpad.appendChild(numpadBtn)
  })
  game.appendChild(numpad)
  const questionBox = document.createElement('div')
  questionBox.classList.add('questionBox')
  questionBox.textContent = '1 + 1 = 11'
  game.appendChild(questionBox)
  const currentPlayerInfo = document.createElement('div')
  currentPlayerInfo.classList.add('currentPlayerInfo')
  const currentPlayerNameText = document.createElement('h2')
  currentPlayerNameText.classList.add('currentPlayerNameText')
  currentPlayerNameText.textContent = "It's " + currentPlayerName + "'s turn!"
  currentPlayerInfo.appendChild(currentPlayerNameText)
  const currentPlayerIcon = document.createElement('div')
  currentPlayerIcon.classList.add('player', 'info', 'icon')
  currentPlayerIcon.innerHTML =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="-1 -1 8 8" width="15rem"><path d="M0 6 6 6C6 5 6 4 5 4L3 4C4 4 5 3 5 2 5 1 4 0 3 0 2 0 1 1 1 2 1 3 2 4 3 4L1 4C0 4 0 5 0 6 Z" stroke="#a7a7a7" stroke-width="0"/></svg>'
  if (currentPlayerIndex === 0) {
    currentPlayerIcon.classList.add('one')
  } else if (currentPlayerIndex === 1) {
    currentPlayerIcon.classList.add('two')
  } else if (currentPlayerIndex === 2) {
    currentPlayerIcon.classList.add('three')
  }
  currentPlayerInfo.appendChild(currentPlayerIcon)
  game.appendChild(currentPlayerInfo)
  const scoreGrid = document.createElement('div')
  scoreGrid.classList.add('scoreGrid')
  for (let i = 0; i < totalQuestions; i++) {
    const scoreIcon = document.createElement('div')
    scoreIcon.classList.add('scoreIcon')
    scoreIcon.innerHTML =
      '<svg width="100" height="100"><circle cx="50" cy="50" r="35" stroke="rgb(187, 187, 187)" stroke-width="5"></circle></svg>'
    scoreGrid.appendChild(scoreIcon)
  }
  currentPlayerInfo.appendChild(scoreGrid)
  content.appendChild(game)
  removeGameplayButtons()
  updateInstruction('Input the answer as fast as you can!')
  initGameplayButtons()
}

function removeGame() {
  const game = document.querySelector('.game')
  if (game != null) {
    game.remove()
  }
}

export function transition(currentPlayerIndex) {
  removeGameplayButtons()
  removeGame()
  const content = document.querySelector('.content')
  const transitionCard = document.createElement('div')
  transitionCard.classList.add('transitionCard')
  const transitionTitle = document.createElement('h2')
  transitionTitle.classList.add('transitionTitle')
  const displayName = allPlayers[currentPlayerIndex].name
  transitionTitle.textContent =
    'Time for ' + displayName + " to play! Press the button below when you're ready!"
  transitionCard.appendChild(transitionTitle)
  const transitionPlayerIcon = document.createElement('div')
  if (currentPlayerIndex === 0) {
    transitionPlayerIcon.classList.add('player', 'one', 'icon')
  } else if (currentPlayerIndex === 1) {
    transitionPlayerIcon.classList.add('player', 'two', 'icon')
  } else if (currentPlayerIndex === 2) {
    transitionPlayerIcon.classList.add('player', 'three', 'icon')
  }
  transitionPlayerIcon.innerHTML =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="-1 -1 8 8" width="15rem"><path d="M0 6 6 6C6 5 6 4 5 4L3 4C4 4 5 3 5 2 5 1 4 0 3 0 2 0 1 1 1 2 1 3 2 4 3 4L1 4C0 4 0 5 0 6 Z" stroke="#a7a7a7" stroke-width="0"/></svg>'
  transitionCard.appendChild(transitionPlayerIcon)
  const transitionButton = document.createElement('button')
  transitionButton.type = 'button'
  transitionButton.classList.add('transitionButton')
  transitionButton.textContent = "Let's Play!"
  transitionCard.appendChild(transitionButton)
  content.appendChild(transitionCard)
  updateInstruction('Waiting for the next player...')
  detectNextPlayer()
}

export function removeTransition() {
  const transitionCard = document.querySelector('.transitionCard')
  transitionCard.remove()
}

export function showResult() {
  removeGameplayButtons()
  removeGame()
  const content = document.querySelector('.content')
  const resultsCard = document.createElement('div')
  resultsCard.classList.add('resultsCard')
  for (let i = 0; i < allPlayers.length; i++) {
    const playerResults = document.createElement('div')
    playerResults.classList.add('playerResults')
    const playerName = document.createElement('h2')
    playerName.classList.add('playerName')
    playerResults.appendChild(playerName)
    const playerIcon = document.createElement('div')
    playerIcon.classList.add('result', 'icon')
    playerIcon.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="-1 -1 8 8" width="15rem"><path d="M0 6 6 6C6 5 6 4 5 4L3 4C4 4 5 3 5 2 5 1 4 0 3 0 2 0 1 1 1 2 1 3 2 4 3 4L1 4C0 4 0 5 0 6 Z" stroke="#a7a7a7" stroke-width="0"/></svg>'
    playerResults.appendChild(playerIcon)
    const playerScore = document.createElement('h3')
    playerScore.classList.add('playerScore')
    playerResults.appendChild(playerScore)
    const playerTime = document.createElement('h3')
    playerTime.classList.add('playerTime')
    playerResults.appendChild(playerTime)
    const playerWins = document.createElement('h3')
    playerWins.classList.add('playerWins')
    playerResults.appendChild(playerWins)
    resultsCard.appendChild(playerResults)
    const currentPlayer = allPlayers[i]
    if (i === 0) {
      playerResults.classList.add('one')
      playerIcon.classList.add('one')
    } else if (i === 1) {
    playerResults.classList.add('two')
    playerIcon.classList.add('two')
    } else if (i === 2) {
    playerResults.classList.add('three')
    playerIcon.classList.add('three')
    }
    playerName.textContent = currentPlayer.name
    playerScore.textContent = 'Correct answers: ' + currentPlayer.roundScore
    playerTime.textContent = 'Time taken: ' + currentPlayer.roundTime + ' seconds'
    playerWins.textContent = 'Rounds won: ' + currentPlayer.score
  }
  content.appendChild(resultsCard)
  const playAgain = document.createElement('button')
  playAgain.type = 'button'
  playAgain.classList.add('play-again')
  playAgain.textContent = 'Play Again'
  content.appendChild(playAgain)
  detectNextRound()
  showWinner(determineWinner())
}

function showWinner(winner) {
  if (winner === 'player1') {
    const winResults = document.querySelector('.playerResults.one')
    winResults.classList.add('winner')
    updateInstruction(allPlayers[0].name + ' wins this round!')
    updatePlayerWins()
  } else if (winner === 'player2') {
    const winResults = document.querySelector('.playerResults.two')
    winResults.classList.add('winner')
    updateInstruction(allPlayers[1].name + ' wins this round!')
    updatePlayerWins()
  } else if (winner === 'player3') {
    const winResults = document.querySelector('.playerResults.three')
    winResults.classList.add('winner')
    updateInstruction(allPlayers[2].name + ' wins this round!')
    updatePlayerWins()    
  } else if (winner === 'tie') {
    const winResults = document.querySelectorAll('.playerResults')
    winResults.forEach((element) => {
      element.classList.add('winner')
    })
    updateInstruction("It's a tie!")
  } else if (winner === 'zero') {
    updateInstruction("It can't be that hard...")
  }
}

export function removeResults() {
  const resultsCard = document.querySelector('.resultsCard')
  resultsCard.remove()
  const playAgainButton = document.querySelector('.play-again')
  playAgainButton.remove()
}

function updatePlayerWins() {
  const player1Wins = document.querySelector('.one .playerWins')
  const player2Wins = document.querySelector('.two .playerWins')
  player1Wins.textContent = 'Rounds won: ' + allPlayers[0].score
  player2Wins.textContent = 'Rounds won: ' + allPlayers[1].score
}

const instruction = document.querySelector('.instruction')
function updateInstruction(inputText) {
  instruction.textContent = inputText
}

export function updateScoreIcon(question, result) {
  const scoreIconList = document.querySelectorAll('.scoreIcon')
  const targetScoreIcon = scoreIconList[question - 1]
  if (result === true) {
    targetScoreIcon.classList.add('correct')
  } else if (result === false) {
    targetScoreIcon.classList.add('wrong')
  }
}

export let questionLength
export function showQuestion(num1, operator, num2) {
  const questionBox = document.querySelector('.questionBox')
  questionBox.textContent = num1 + ' ' + operator + ' ' + num2 + '= '
  questionLength = questionBox.textContent.length
}
