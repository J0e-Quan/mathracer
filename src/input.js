import { setPlayerNames } from './player.js'
import { updateStorage, retrieveStorage } from './storage.js'
import {
  checkAnswer,
  getStartTime,
  newRound,
  updateTotalQuestions,
  currentPlayerIndex,
  totalQuestions,
  resetCurrentPlayerIndex
} from './game.js'
import {
  questionLength,
  transition,
  removeTransition,
  newGame,
  removeResults,
  hideInitial,
  addPlayerForm,
  removePlayerForm,
  updateTheme
} from './display.js'
const tutorialCloseBtn = document.querySelector('.close-tutorial')
const tutorialBtn = document.querySelector('.tutorial-button')
const settingsCloseBtn = document.querySelector('.close-settings')
const settingsBtn = document.querySelector('.settings-button')
const tutorial = document.querySelector('.tutorial')
const settingsMenu = document.querySelector('.settings-menu')
const initial = document.querySelector('.initial')
const nameBtn = document.querySelector('.submit-name')
const playerToggle = document.querySelector('.players-toggle')
const twoPlayers = document.querySelector('.two.players')
const threePlayers = document.querySelector('.three.players')
const questionsToggle = document.querySelector('.questions-toggle')
const fiveQuestions = document.querySelector('.five.questions')
const tenQuestions = document.querySelector('.ten.questions')
const themeToggle = document.querySelector('.theme-toggle')
let numpad
let questionBox
const settings = retrieveStorage()
initPlayer(settings.numberOfPlayers)
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

function showSettings() {
  settingsMenu.classList.remove('hidden')
  settingsMenu.showModal()
}

function hideSettings() {
  settingsMenu.classList.add('hidden')
  settingsMenu.close()
}

function initPlayer(numberOfPlayers) {
  const twoPlayers = document.querySelector('.two.players')
  const threePlayers = document.querySelector('.three.players')
  if (numberOfPlayers === 2) {
    twoPlayers.classList.add('checked')
    threePlayers.classList.remove('checked')
    removePlayerForm()
  } else if (numberOfPlayers === 3) {
    threePlayers.classList.add('checked')
    twoPlayers.classList.remove('checked')
    addPlayerForm()
  }
}

function togglePlayer(btn) {
  const targetBtn = btn.target
  if (targetBtn.classList.contains('two') && !targetBtn.classList.contains('checked')) {
    targetBtn.classList.add('checked')
    threePlayers.classList.remove('checked')
    removePlayerForm()
    updateStorage('numberOfPlayers', 2)
  } else if (targetBtn.classList.contains('three') && !targetBtn.classList.contains('checked')) {
    targetBtn.classList.add('checked')
    twoPlayers.classList.remove('checked')
    addPlayerForm()
    updateStorage('numberOfPlayers', 3)
  }
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

function initThemes() {

}

function toggleThemes(btn) {
  const targetBtn = btn.target
  const themes = document.querySelectorAll('button.theme')
  themes.forEach((theme) => {
    theme.classList.remove('checked')
  })
  targetBtn.classList.add('checked')
  updateTheme(targetBtn.textContent.toLowerCase())
  updateStorage('theme', targetBtn.textContent.toLowerCase())
}

function beginGame() {
  setPlayerNames()
  hideInitial()
  transition(currentPlayerIndex)
}

export function initInitialButtons() {
  tutorialBtn.addEventListener('click', showTutorial)
  settingsBtn.addEventListener('click', showSettings)
  tutorialCloseBtn.addEventListener('click', hideTutorial)
  settingsCloseBtn.addEventListener('click', hideSettings)
  nameBtn.addEventListener('click', beginGame)
  questionsToggle.addEventListener('click', toggleQuestions)
  playerToggle.addEventListener('click', togglePlayer)
  themeToggle.addEventListener('click', toggleThemes)
}

export function removeInitialButtons() {
  tutorialBtn.removeEventListener('click', showTutorial)
  settingsBtn.removeEventListener('click', showSettings)
  tutorialCloseBtn.removeEventListener('click', hideTutorial)
  settingsCloseBtn.removeEventListener('click', hideSettings)
  nameBtn.removeEventListener('click', beginGame)
  questionsToggle.removeEventListener('click', toggleQuestions)
  playerToggle.removeEventListener('click', togglePlayer)
  themeToggle.removeEventListener('click', toggleThemes)
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
      newGame(currentPlayerIndex, totalQuestions)
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
      newRound()
      resetCurrentPlayerIndex()
      transition(currentPlayerIndex)
    },
    { once: true }
  )
}
