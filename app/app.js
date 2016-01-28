'use strict';

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let mainWindow;

function createWindow () {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        show: false,
        title: 'MailJS',
        icon: './icon.png',
        backgroundColor: '#dd4b39',
        darkTheme: true,
        titleBarStyle: 'hidden',
        webPreferences: {
            nodeIntegration: false
        }
    });
    mainWindow.setMenu(null);
    mainWindow.loadURL('http://mail.mailjs.net');
    mainWindow.show();
    mainWindow.maximize();
    mainWindow.on('closed', function() {
        mainWindow = null;
    });
    mainWindow.onbeforeunload = function(e) {
        if(!confirm('Are you sure you want to close the app?')) {
            e.returnValue = false;
        }
    };
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', function () {
    if (mainWindow === null) {
        createWindow();
    }
});
