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