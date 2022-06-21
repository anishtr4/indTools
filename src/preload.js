const electron = require('electron');
const {ipcRenderer} = electron;
window.ipcRenderer = electron.ipcRenderer; 