const { app, BrowserWindow, Notification } = require('electron')
const path = require('path')


// Crea la ventana 
const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  //Carga el html, tambien puede ser una ruta (Leer documentacion sobre webview)
  // win.loadURL('https://miguelangelparra.com.ar')
  win.loadFile('index.html')
}

const NOTIFICATION_TITLE = 'Notification Basic!'
const NOTIFICATION_BODY = 'Hola! Notificacion en el MainProcess'

function showNotification() {
  new Notification({ title: NOTIFICATION_TITLE, body: NOTIFICATION_BODY }).show()
}

//Crea la aplicacion
app.whenReady()
  .then(() => {
    //Ejecuta la creacion de ventanas
    createWindow()
    showNotification()

    //Destruye la aplicacion cuando todas las ventanas esten cerradas
    app.on('window-all-closed', () => {
      //si el usuario es diferente a IOS
      if (process.platform !== 'darwin') app.quit()
    })

    // En caso de ios, cuando no existan ventanas abiertas y ocurra el evento de activacion
    // crea una nueva ventana
    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })

  })



