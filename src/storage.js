let settings = { totalQuestions: 10 }

export function updateStorage(category, value) {
  settings[category] = value
  const settingsString = JSON.stringify(settings)
  localStorage.setItem("settings", settingsString)
}

export function retrieveStorage() {
  if (localStorage.getItem("settings") !== null) {
    settings = JSON.parse(localStorage.getItem("settings"))
    return settings
  } else {
    settings = { totalQuestions: 10 }
  return settings
}}