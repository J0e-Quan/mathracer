// default settings values
let settings = { totalQuestions: 10, numberOfPlayers: 2, theme: 'classic' }

export function updateStorage(category, value) {
  settings[category] = value
  const settingsString = JSON.stringify(settings)
  localStorage.setItem('settings', settingsString)
}

export function retrieveStorage() {
  if (localStorage.getItem('settings') !== null) {
    settings = JSON.parse(localStorage.getItem('settings'))
    return settings
  } else {
    // default settings values
    settings = { totalQuestions: 10, numberOfPlayers: 2, theme: 'classic' }
    return settings
  }
}
