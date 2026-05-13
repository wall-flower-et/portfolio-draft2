const KEY = 'portfolio-cms'

export function loadCMS() {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : null
  } catch { return null }
}

export function saveCMS(data) {
  localStorage.setItem(KEY, JSON.stringify(data))
}

export function clearCMS() {
  localStorage.removeItem(KEY)
}
