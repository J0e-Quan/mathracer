const settings = {totalQuestions: 10}

export function updateStorage(category, value) {
  settings[category] = value
  localStorage.setItem("settings", settings)
}

export function retrieveStorage() {
  return localStorage.getItem("settings")
}
