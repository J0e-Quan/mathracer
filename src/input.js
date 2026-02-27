import { setPlayerNames } from './player.js'
import { checkAnswer, newRound } from './game.js'
import { questionLength, removeTransition, newGame } from './display.js'
const tutorialCloseBtn = document.querySelector('.close-tutorial')
const tutorialBtn = document.querySelector('.tutorial-button')
const tutorial = document.querySelector('.tutorial')
const initial = document.querySelector('.initial')
const nameBtn = document.querySelector('.submit-name')
let numpad
let questionBox

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

export function initInitialButtons() {
  tutorialBtn.addEventListener('click', showTutorial)
  tutorialCloseBtn.addEventListener('click', hideTutorial)
  nameBtn.addEventListener('click', setPlayerNames)
}

export function removeInitialButtons() {
  tutorialBtn.removeEventListener('click', showTutorial)
  tutorialCloseBtn.removeEventListener('click', hideTutorial)
  nameBtn.removeEventListener('click', setPlayerNames)
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
  numpad.addEventListener('click', detectNumpadInput)
  window.addEventListener('keydown', detectKeyboardInput)
}

export function removeGameplayButtons() {
  getGameplayElements()
  numpad.removeEventListener('click', detectNumpadInput)
  window.removeEventListener('keydown', detectKeyboardInput)
}

export function detectNextRound() {
  const transitionButton = document.querySelector('.transitionButton')
  transitionButton.addEventListener(
    'click',
    () => {
      removeTransition()
      newRound()
      newGame()
    },
    { once: true }
  )
}