let settings = {totalQuestions: 10}

export function updateStorage(category, value) {
  settings[category] = value
  localStorage.setItem("settings", settings)
}

export function retrieveStorage() {
  if (localStorage.getItem("settings") !== null) {
    settings = localStorage.getItem("settings")
  } else {
    settings = { totalQuestions: 10 }
  return settings
}
