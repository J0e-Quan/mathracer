import { setPlayerNames } from './player.js'
import { updateStorage, retrieveStorage } from './storage.js'
import {
  checkAnswer,
  getStartTime,
  newRound,
  updateTotalQuestions,
  isPlayer1Turn,
  totalQuestions
} from './game.js'
import {
  questionLength,
  transition,
  removeTransition,
  newGame,
  removeResults,
  hideInitial
} from './display.js'
const tutorialCloseBtn = document.querySelector('.close-tutorial')
const tutorialBtn = document.querySelector('.tutorial-button')
const tutorial = document.querySelector('.tutorial')
const initial = document.querySelector('.initial')
const nameBtn = document.querySelector('.submit-name')
const questionsToggle = document.querySelector('.questions-toggle')
const fiveQuestions = document.querySelector('.five.questions')
const tenQuestions = document.querySelector('.ten.questions')
let numpad
let questionBox
const settings = retrieveStorage()
initQuestions(settings.totalQuestions)

function showTutorial() {
  initial.classList.add('hidden')
  tutorialBtn.classList.add('hidden')
  tutorial.classList.remove('hidden')
}

function hideTutorial() {
  initial.classList.remove('hidden')
  tutorialBtn.classList.remove('hidden')
  tutorial.classList.add('hidden')
}

function initQuestions(totalQuestions) {
  const fiveQuestions = document.querySelector('.five')
  const tenQuestions = document.querySelector('.ten')
  if (totalQuestions === 5) {
    // set total to 5
    fiveQuestions.classList.add('checked')
    tenQuestions.classList.remove('checked')
    updateTotalQuestions(5)
  } else if (totalQuestions === 10) {
    // set total to 10
    tenQuestions.classList.add('checked')
    fiveQuestions.classList.remove('checked')
    updateTotalQuestions(10)
  }
}

function toggleQuestions(btn) {
  const targetBtn = btn.target
  if (targetBtn.classList.contains('five') && !targetBtn.classList.contains('checked')) {
    targetBtn.classList.add('checked')
    tenQuestions.classList.remove('checked')
    updateTotalQuestions(5)
    updateStorage('totalQuestions', 5)
  } else if (targetBtn.classList.contains('ten') && !targetBtn.classList.contains('checked')) {
    targetBtn.classList.add('checked')
    fiveQuestions.classList.remove('checked')
    updateTotalQuestions(10)
    updateStorage('totalQuestions', 10)
  }
}

function beginGame() {
  setPlayerNames()
  hideInitial()
  transition(isPlayer1Turn)
}

export function initInitialButtons() {
  tutorialBtn.addEventListener('click', showTutorial)
  tutorialCloseBtn.addEventListener('click', hideTutorial)
  nameBtn.addEventListener('click', beginGame)
  questionsToggle.addEventListener('click', toggleQuestions)
}

export function removeInitialButtons() {
  tutorialBtn.removeEventListener('click', showTutorial)
  tutorialCloseBtn.removeEventListener('click', hideTutorial)
  nameBtn.removeEventListener('click', beginGame)
  questionsToggle.removeEventListener('click', toggleQuestions)
}

function getGameplayElements() {
  numpad = document.querySelector('.numpad')
  questionBox = document.querySelector('.questionBox')
}

function detectNumpadInput(btn) {
  const targetBtn = btn.target
  if (targetBtn.dataset.action === 'submit') {
    const inputAnswer = questionBox.textContent.slice(questionLength)
    checkAnswer(inputAnswer)
  } else if (targetBtn.dataset.action === 'backspace') {
    if (questionBox.textContent.length > questionLength) {
      questionBox.textContent = questionBox.textContent.slice(0, -1)
    }
  } else {
    questionBox.textContent = questionBox.textContent + targetBtn.dataset.action
  }
}

function detectKeyboardInput(press) {
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
    checkAnswer(inputAnswer)
  }
}

export function initGameplayButtons() {
  getGameplayElements()
  if (numpad != null) {
    numpad.addEventListener('click', detectNumpadInput)
    window.addEventListener('keydown', detectKeyboardInput)
  }
}

export function removeGameplayButtons() {
  getGameplayElements()
  if (numpad != null) {
    numpad.removeEventListener('click', detectNumpadInput)
    window.removeEventListener('keydown', detectKeyboardInput)
  }
}

export function detectNextPlayer() {
  const transitionButton = document.querySelector('.transitionButton')
  transitionButton.addEventListener(
    'click',
    () => {
      removeTransition()
      newRound()
      newGame(isPlayer1Turn, totalQuestions)
      getStartTime()
    },
    { once: true }
  )
}

export function detectNextRound() {
  const playAgainButton = document.querySelector('.play-again')
  playAgainButton.addEventListener(
    'click',
    () => {
      removeResults()
      transition(isPlayer1Turn)
    },
    { once: true }
  )
}
