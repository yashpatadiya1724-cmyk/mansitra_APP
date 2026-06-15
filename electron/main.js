const { app, BrowserWindow, shell } = require('electron')
const path = require('path')
const { spawn } = require('child_process')

const isDev = process.env.NODE_ENV === 'development'

let mainWindow
let backendProcess

function startBackend() {
  // In production, backend is bundled in resources
  const backendPath = isDev
    ? path.join(__dirname, '../backend')
    : path.join(process.resourcesPath, '../backend')

  const serverFile = path.join(backendPath, 'server.js')

  backendProcess = spawn(process.execPath, [serverFile], {
    cwd: backendPath,
    env: { ...process.env, NODE_ENV: 'production' },
    stdio: 'ignore',
  })

  backendProcess.on('error', (err) => console.error('Backend error:', err))
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1100,
    height: 780,
    minWidth: 380,
    minHeight: 600,
    title: 'Manasitra — Mann Ka Mitra',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
    backgroundColor: '#F5F1E8',
    show: false,
    autoHideMenuBar: true,
  })

  // Open external links in system browser
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url)
    return { action: 'deny' }
  })

  if (isDev) {
    mainWindow.loadURL('http://localhost:5173')
  } else {
    mainWindow.loadFile(path.join(__dirname, '../manasitra-web/dist/index.html'))
  }

  mainWindow.once('ready-to-show', () => mainWindow.show())
  mainWindow.on('closed', () => { mainWindow = null })
}

app.whenReady().then(() => {
  startBackend()
  setTimeout(createWindow, isDev ? 0 : 1500)

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (backendProcess) backendProcess.kill()
  if (process.platform !== 'darwin') app.quit()
})

app.on('before-quit', () => {
  if (backendProcess) backendProcess.kill()
})
