import {setPlayerNames} from './player.js'
const tutorialCloseBtn = document.querySelector('.close-tutorial')
const tutorialBtn = document.querySelector('.tutorial-button')
const tutorial = document.querySelector('.tutorial')
const initial = document.querySelector('.initial')
const nameBtn = document.querySelector('.submit-name')


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