import { Menu, _electron } from 'electron';

/**
 * @param golemVersion
 * @param appQuit
 * @param zoomIn
 * @param zoomOut
 * @param zoomReset
 * @param zoomBuildTimeValue
 * @param goBack
 * @param goForward
 * @param getCurrentUrl
 * @param clearAppData
 * @param disableDevTools
 */
function createMenu({
  golemVersion,
  appQuit,
  zoomIn,
  zoomOut,
  zoomReset,
  zoomBuildTimeValue,
  goBack,
  goForward,
  getCurrentUrl,
  clearAppData,
  disableDevTools,
}) {
  if (Menu.getApplicationMenu()) {
    return;
  }
  const zoomResetLabel =
    zoomBuildTimeValue === 1.0
      ? 'Reset Zoom'
      : `Reset Zoom (to ${zoomBuildTimeValue * 100}%, set at build time)`;

  const template = [
    {
      label: 'GOLEM',
      role: 'window',
      submenu: [
        {
          label: 'Reload',
          accelerator: 'CmdOrCtrl+R',
          click: function click(item, focusedWindow) {
            if (focusedWindow) {
              focusedWindow.reload();
            }
          },
        },
        {
          label: 'Minimize',
          accelerator: 'CmdOrCtrl+M',
          role: 'minimize',
        },
        {
          label: 'Quit',
          accelerator: 'CmdOrCtrl+W',
          role: 'close',
        },
      ],
    },
    {
      label: 'Edit',
      submenu: [
        {
          label: 'Undo',
          accelerator: 'CmdOrCtrl+Z',
          role: 'undo',
        },
        {
          label: 'Redo',
          accelerator: 'Shift+CmdOrCtrl+Z',
          role: 'redo',
        },
        {
          type: 'separator',
        },
        {
          label: 'Cut',
          accelerator: 'CmdOrCtrl+X',
          role: 'cut',
        },
        {
          label: 'Copy',
          accelerator: 'CmdOrCtrl+C',
          role: 'copy',
        },
        {
          label: 'Copy Current URL',
          accelerator: 'CmdOrCtrl+L',
          click: function click() {
            const currentURL = getCurrentUrl();
            _electron.clipboard.writeText(currentURL);
          },
        },
        {
          label: 'Paste',
          accelerator: 'CmdOrCtrl+V',
          role: 'paste',
        },
        {
          label: 'Paste and Match Style',
          accelerator: 'CmdOrCtrl+Shift+V',
          role: 'pasteandmatchstyle',
        },
        {
          label: 'Select All',
          accelerator: 'CmdOrCtrl+A',
          role: 'selectall',
        },
      ],
    },
    {
      label: 'View',
      submenu: [
        {
          label: 'Back',
          accelerator: 'CmdOrCtrl+[',
          click: function click() {
            goBack();
          },
        },
        {
          label: 'Forward',
          accelerator: 'CmdOrCtrl+]',
          click: function click() {
            goForward();
          },
        },
        {
          type: 'separator',
        },
        {
          label: 'Zoom In',
          accelerator: (() => {
            if (process.platform === 'darwin') {
              return 'Command+=';
            }
            return 'Ctrl+=';
          })(),
          click: function click() {
            zoomIn();
          },
        },
        {
          label: 'Zoom Out',
          accelerator: (() => {
            if (process.platform === 'darwin') {
              return 'Command+-';
            }
            return 'Ctrl+-';
          })(),
          click: function click() {
            zoomOut();
          },
        },
        {
          label: zoomResetLabel,
          accelerator: (() => {
            if (process.platform === 'darwin') {
              return 'Command+0';
            }
            return 'Ctrl+0';
          })(),
          click: function click() {
            zoomReset();
          },
        },
        {
          label: 'Toggle Full Screen',
          accelerator: (() => {
            if (process.platform === 'darwin') {
              return 'Ctrl+Command+F';
            }
            return 'F11';
          })(),
          click: function click(item, focusedWindow) {
            if (focusedWindow) {
              focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
            }
          },
        },
      ],
    },
    {
      label: 'Privacy',
      submenu: [
        {
          label: 'Flush App Data',
          click: function click() {
            clearAppData();
          },
        },
      ],
    },
    {
      label: 'About',
      submenu: [
        {
          label: `GOLEM Engine v${golemVersion}`,
          click: function click() {
            _electron.shell.openExternal(
              'https://github.com/loouislow81/golem#README.md',
            );
          },
        },
        {
          label: 'Report an Issue',
          click: function click() {
            _electron.shell.openExternal(
              'https://github.com/loouislow81/golem/issues',
            );
          },
        },
        {
          type: 'separator',
        },
        {
          label: 'Get GOLEM AppStore',
          click: function click() {
            _electron.shell.openExternal(
              'https://github.com/loouislow81/golem-appstore',
            );
          },
        },
        {
          label: 'Get GOLEM CLI',
          click: function click() {
            _electron.shell.openExternal(
              'https://github.com/loouislow81/golem-cli',
            );
          },
        },
      ],
    },
  ];

  if (disableDevTools) {
    // remove last item (dev tools) from menu > view
    const { submenu } = template[1];
    submenu.splice(submenu.length - 1, 1);
  }

  if (process.platform === 'darwin') {
    template.unshift({
      label: 'Electron',
      submenu: [
        {
          label: 'Services',
          role: 'services',
          submenu: [],
        },
        {
          type: 'separator',
        },
        {
          label: 'Hide App',
          accelerator: 'Command+H',
          role: 'hide',
        },
        {
          label: 'Hide Others',
          accelerator: 'Command+Shift+H',
          role: 'hideothers',
        },
        {
          label: 'Show All',
          role: 'unhide',
        },
        {
          type: 'separator',
        },
        {
          label: 'Quit',
          accelerator: 'Command+Q',
          click: () => {
            appQuit();
          },
        },
      ],
    });
    template[3].submenu.push(
      {
        type: 'separator',
      },
      {
        label: 'Bring All to Front',
        role: 'front',
      },
    );
  }

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

export default createMenu;
