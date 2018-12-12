/**
 Preload file that will be executed in the renderer process
 */
import { ipcRenderer } from 'electron';
import path from 'path';
import fs from 'fs';

const INJECT_JS_PATH = path.join(__dirname, '../../', 'inject/inject.js');
const log = require('loglevel');
/**
 * Patches window.Notification to:
 * - set a callback on a new Notification
 * - set a callback for clicks on notifications
 * @param createCallback
 * @param clickCallback
 */
function setNotificationCallback(createCallback, clickCallback) {
  const OldNotify = window.Notification;
  const newNotify = (title, opt) => {
    createCallback(title, opt);
    const instance = new OldNotify(title, opt);
    instance.addEventListener('click', clickCallback);
    return instance;
  }
  newNotify.requestPermission = OldNotify.requestPermission.bind(OldNotify);
  Object.defineProperty(newNotify, 'permission', {
    get: () => OldNotify.permission,
  });

  window.Notification = newNotify;
}

function injectScripts() {
  const needToInject = fs.existsSync(INJECT_JS_PATH);
  if (!needToInject) {
    return;
  }
  // Dynamically require scripts
  // eslint-disable-next-line global-require, import/no-dynamic-require
  require(INJECT_JS_PATH);
}

function notifyNotificationCreate(title, opt) {
  ipcRenderer.send('notification', title, opt);
}

function notifyNotificationClick() {
  ipcRenderer.send('notification-click');
}

setNotificationCallback(notifyNotificationCreate, notifyNotificationClick);

document.addEventListener('DOMContentLoaded', () => {
  injectScripts();
})

ipcRenderer.on('params', (event, message) => {
  const appArgs = JSON.parse(message);
  log.info('golem.json', appArgs);
})

ipcRenderer.on('debug', (event, message) => {
  // eslint-disable-next-line no-console
  log.info('debug:', message);
})
