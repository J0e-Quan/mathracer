let currentScore = 0
let timeTaken = 0
let startTime = 0
let endTime = 0
let isPlayer1Turn = true
let answer
let question = 0
function newRound() {
  isPlayer1Turn = !isPlayer1Turn
  question = 0
  currentScore = 0
  timeTaken = 0
}
function incrementScore() {
  currentScore++
}
function getStartTime() {
  startTime = performance.now()
}
function getEndTime() {
  endTime = performance.now()
}
function calcCurrentTime() {
  // performance.now() gives time in ms, this rounds and converts output to s
  timeTaken = Math.floor((endTime - startTime) / 1000)
}
function newQuestion() {
  if (question <= 10) {
    const num1 = Math.floor(Math.random() * 99) + 1
    const num2 = Math.floor(Math.random() * 99) + 1
    let operator
    const operatorChoice = Math.floor(Math.random() * 2)
    if (operatorChoice === 0) {
      operator = '+'
    } else if (operatorChoice === 1) {
      operator = '-'
    }
    if (operator === '-' && num2 > num1) {
      newQuestion()
    } else {
      determineAnswer(num1, operator, num2)
      displayManager.showQuestion(num1, operator, num2)
    }
  }
}
function determineAnswer(num1, operator, num2) {
  if (operator === '+') {
    answer = num1 + num2
  } else if (operator === '-') {
    answer = num1 - num2
  }
}
function checkAnswer(inputAnswer) {
  if (answer === Number(inputAnswer)) {
    question++
    incrementScore()
    displayManager.updateScoreIcon(question, true)
  } else if (answer !== Number(inputAnswer)) {
    question++
    displayManager.updateScoreIcon(question, false)
  }
}
function endRound() {
  getEndTime()
  calcCurrentTime()
  if (isPlayer1Turn === true) {
    playerManager.player1.roundScore = currentScore
    playerManager.player1.roundTime = timeTaken
    displayManager.transition()
  } else if (isPlayer1Turn === false) {
    playerManager.player2.roundScore = currentScore
    playerManager.player2.roundTime = timeTaken
    displayManager.showResult()
  }
}
return {
  get currentScore() {
    return currentScore
  },
  get timeTaken() {
    return timeTaken
  },
  get isPlayer1Turn() {
    return isPlayer1Turn
  },
  newRound,
  newQuestion,
  getStartTime,
  getEndTime,
  checkAnswer,
  endRound
}
