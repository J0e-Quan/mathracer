import { transition, showResult, updateScoreIcon, showQuestion } from './display.js'
import { allPlayers } from './player.js'
let currentScore = 0
let timeTaken = 0
let startTime = 0
let endTime = 0
export let totalQuestions = 10
export let currentPlayerIndex = 0
let answer
let question = 0

export function resetCurrentPlayerIndex() {
  currentPlayerIndex = 0
}

export function newRound() {
  question = 0
  currentScore = 0
  timeTaken = 0
}
function incrementScore() {
  currentScore++
}
export function updateTotalQuestions(num) {
  totalQuestions = num
}
export function getStartTime() {
  startTime = performance.now()
  newQuestion()
}
function getEndTime() {
  endTime = performance.now()
}
function calcCurrentTime() {
  // performance.now() gives time in ms, this rounds and converts output to s
  timeTaken = Math.floor((endTime - startTime) / 1000)
}
export function newQuestion() {
  if (question <= totalQuestions) {
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
      showQuestion(num1, operator, num2)
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
export function checkAnswer(inputAnswer) {
  if (answer === Number(inputAnswer)) {
    question++
    incrementScore()
    updateScoreIcon(question, true)
  } else if (answer !== Number(inputAnswer)) {
    question++
    updateScoreIcon(question, false)
  }
  if (question < totalQuestions) {
    newQuestion()
  } else {
    endRound()
  }
}
export function endRound() {
  getEndTime()
  calcCurrentTime()
  allPlayers[currentPlayerIndex].roundScore = currentScore
  allPlayers[currentPlayerIndex].roundTime = timeTaken
  if (currentPlayerIndex >= allPlayers.length - 1) {
    // this means end of array has been reached
    showResult()
  } else {
    currentPlayerIndex++
    transition(currentPlayerIndex)
  }
}
