import * as icons from './icons.js'
console.log("Icons: "+icons)

function hideInitial() {
  tutorialBtn.classList.add('hidden')
  initial.classList.add('hidden')
  newGame()
}
function newGame() {
  window.removeEventListener('keydown', detectKeyboardInput)
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
  if (gameManager.isPlayer1Turn === true) {
    currentPlayerNameText.textContent = "It's " + playerManager.player1.name + "'s turn!"
  } else if (gameManager.isPlayer1Turn === false) {
    currentPlayerNameText.textContent = "It's " + playerManager.player2.name + "'s turn!"
  }
  currentPlayerInfo.appendChild(currentPlayerNameText)
  const currentPlayerIcon = document.createElement('div')
  currentPlayerIcon.classList.add('player', 'info', 'icon')
  currentPlayerIcon.innerHTML =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="-1 -1 8 8" width="15rem"><path d="M0 6 6 6C6 5 6 4 5 4L3 4C4 4 5 3 5 2 5 1 4 0 3 0 2 0 1 1 1 2 1 3 2 4 3 4L1 4C0 4 0 5 0 6 Z" stroke="#a7a7a7" stroke-width="0"/></svg>'
  if (gameManager.isPlayer1Turn === true) {
    currentPlayerIcon.classList.add('one')
  } else if (gameManager.isPlayer1Turn === false) {
    currentPlayerIcon.classList.add('two')
  }
  currentPlayerInfo.appendChild(currentPlayerIcon)
  game.appendChild(currentPlayerInfo)
  const scoreGrid = document.createElement('div')
  scoreGrid.classList.add('scoreGrid')
  for (let i = 0; i < 10; i++) {
    const scoreIcon = document.createElement('div')
    scoreIcon.classList.add('scoreIcon')
    scoreIcon.innerHTML =
      '<svg width="100" height="100"><circle cx="50" cy="50" r="35" stroke="rgb(187, 187, 187)" stroke-width="5"></circle></svg>'
    scoreGrid.appendChild(scoreIcon)
  }
  currentPlayerInfo.appendChild(scoreGrid)
  content.appendChild(game)
  updateInstruction('Input the answer as fast as you can!')
  gameManager.getStartTime()
  gameManager.newQuestion()
  detectNumpadInput()
}

function removeGame() {
  const game = document.querySelector('.game')
  game.remove()
}

function transition() {
  removeGame()
  const content = document.querySelector('.content')
  const transitionCard = document.createElement('div')
  transitionCard.classList.add('transitionCard')
  const transitionTitle = document.createElement('h2')
  transitionTitle.classList.add('transitionTitle')
  transitionTitle.textContent =
    'Time for ' + playerManager.player2.name + " to play! Press the button below when you're ready!"
  transitionCard.appendChild(transitionTitle)
  const transitionPlayerIcon = document.createElement('div')
  transitionPlayerIcon.classList.add('player', 'two', 'icon')
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
  detectNextRound()
}

function removeTransition() {
  const transitionCard = document.querySelector('.transitionCard')
  transitionCard.remove()
}

function showResult() {
  removeGame()
  const content = document.querySelector('.content')
  const resultsCard = document.createElement('div')
  let showPlayer1Results = true
  resultsCard.classList.add('resultsCard')
  for (let i = 0; i < 2; i++) {
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
    resultsCard.appendChild(playerResults)
    if (showPlayer1Results === true) {
      playerResults.classList.add('one')
      playerName.textContent = playerManager.player1.name
      playerIcon.classList.add('one')
      playerScore.textContent = 'Correct answers: ' + playerManager.player1.roundScore
      playerTime.textContent = 'Time taken: ' + playerManager.player1.roundTime + ' seconds'
      showPlayer1Results = !showPlayer1Results
      continue
    } else if (showPlayer1Results === false) {
      playerResults.classList.add('two')
      playerName.textContent = playerManager.player2.name
      playerIcon.classList.add('two')
      playerScore.textContent = 'Correct answers: ' + playerManager.player2.roundScore
      playerTime.textContent = 'Time taken: ' + playerManager.player2.roundTime + ' seconds'
      continue
    }
  }
  content.appendChild(resultsCard)
  showWinner(playerManager.determineWinner())
}

function showWinner(winner) {
  if (winner === 'player1') {
    const winResults = document.querySelector('.playerResults.one')
    winResults.classList.add('winner')
    updateInstruction(
      playerManager.player1.name + ' wins! Refresh the page or click the logo to play again...'
    )
  } else if (winner === 'player2') {
    const winResults = document.querySelector('.playerResults.two')
    winResults.classList.add('winner')
    updateInstruction(
      playerManager.player2.name + ' wins! Refresh the page or click the logo to play again...'
    )
  } else if (winner === 'tie') {
    const winResults = document.querySelectorAll('.playerResults')
    winResults.forEach((element) => {
      element.classList.add('winner')
    })
    updateInstruction("It's a tie! Refresh the page or click the logo to play again...")
  }
}

const instruction = document.querySelector('.instruction')
function updateInstruction(inputText) {
  instruction.textContent = inputText
}

function updateScoreIcon(question, result) {
  if (question < 10) {
    const scoreIconList = document.querySelectorAll('.scoreIcon')
    const targetScoreIcon = scoreIconList[question - 1]
    if (result === true) {
      targetScoreIcon.classList.add('correct')
    } else if (result === false) {
      targetScoreIcon.classList.add('wrong')
    }
    gameManager.newQuestion()
  } else if (question >= 10) {
    gameManager.endRound()
  }
}

let questionLength
function showQuestion(num1, operator, num2) {
  const questionBox = document.querySelector('.questionBox')
  questionBox.textContent = num1 + ' ' + operator + ' ' + num2 + '= '
  questionLength = questionBox.textContent.length
}

// event listeners for initial + tutorial buttons
const tutorialBtn = document.querySelector('.tutorial-button')
const tutorial = document.querySelector('.tutorial')
const initial = document.querySelector('.initial')
tutorialBtn.addEventListener('click', () => {
  initial.classList.add('hidden')
  tutorialBtn.classList.add('hidden')
  tutorial.classList.remove('hidden')
})
const tutorialCloseBtn = document.querySelector('.close-tutorial')
tutorialCloseBtn.addEventListener('click', () => {
  initial.classList.remove('hidden')
  tutorialBtn.classList.remove('hidden')
  tutorial.classList.add('hidden')
})

function detectNumpadInput() {
  const numpad = document.querySelector('.numpad')
  const questionBox = document.querySelector('.questionBox')
  // event listener for clicking/touching the numpad
  numpad.addEventListener('click', (btn) => {
    const targetBtn = btn.target
    if (targetBtn.dataset.action === 'submit') {
      const inputAnswer = questionBox.textContent.slice(questionLength)
      gameManager.checkAnswer(inputAnswer)
    } else if (targetBtn.dataset.action === 'backspace') {
      if (questionBox.textContent.length > questionLength) {
        questionBox.textContent = questionBox.textContent.slice(0, -1)
      }
    } else {
      questionBox.textContent = questionBox.textContent + targetBtn.dataset.action
    }
  })
  // event listener for keyboard input
  window.addEventListener('keydown', detectKeyboardInput)
}

function detectNextRound() {
  const transitionButton = document.querySelector('.transitionButton')
  transitionButton.addEventListener('click', () => {
    removeTransition()
    gameManager.newRound()
    newGame()
  })
}

function detectKeyboardInput(press) {
  const questionBox = document.querySelector('.questionBox')
  if (press.repeat) {
    return
  }
  if (press.key >= '0' && press.key <= '9') {
    const value = Number(press.key)
    questionBox.textContent = questionBox.textContent + value
  } else if (press.key === 'Backspace') {
    if (questionBox.textContent.length > questionLength) {
      questionBox.textContent = questionBox.textContent.slice(0, -1)
    }
  } else if (press.key === 'Enter') {
    const inputAnswer = questionBox.textContent.slice(questionLength)
    gameManager.checkAnswer(inputAnswer)
  }
}

return {
  hideInitial,
  newGame,
  transition,
  showResult,
  updateInstruction,
  updateScoreIcon,
  showQuestion
}
