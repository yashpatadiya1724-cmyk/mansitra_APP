import localforage from 'localforage'

localforage.config({ name: 'manasitra', storeName: 'app_data' })

export const saveData = async (key, value) => {
  try {
    await localforage.setItem(key, value)
  } catch {
    // Fallback to sessionStorage if localforage fails
    try { sessionStorage.setItem(key, JSON.stringify(value)) } catch { /* silent */ }
  }
}

export const loadData = async (key) => {
  try {
    return await localforage.getItem(key)
  } catch {
    try {
      const val = sessionStorage.getItem(key)
      return val ? JSON.parse(val) : null
    } catch { return null }
  }
}

export const deleteData = async (key) => {
  try { await localforage.removeItem(key) } catch { /* silent */ }
  try { sessionStorage.removeItem(key) } catch { /* silent */ }
  try { localStorage.removeItem(key) } catch { /* silent */ }
}

export const clearAllData = async () => {
  try { await localforage.clear() } catch { /* silent */ }
  try { sessionStorage.clear() } catch { /* silent */ }
  // Keep only non-sensitive prefs
}
