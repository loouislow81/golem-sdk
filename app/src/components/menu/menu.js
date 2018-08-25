import { Menu, shell, clipboard } from 'electron';

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
  const zoomResetLabel = (zoomBuildTimeValue === 1.0) ?
    'Reset Zoom' :
    `Reset Zoom (to ${zoomBuildTimeValue * 100}%, set at build time)`;

  const template = [
    {
      label: 'App',
      role: 'window',
      submenu: [
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
      label: 'Privacy',
        submenu: [
      //   {
      //     label: 'Undo',
      //     accelerator: 'CmdOrCtrl+Z',
      //     role: 'undo',
      //   },
      //   {
      //     label: 'Redo',
      //     accelerator: 'Shift+CmdOrCtrl+Z',
      //     role: 'redo',
      //   },
      //   {
      //     type: 'separator',
      //   },
      //   {
      //     label: 'Cut',
      //     accelerator: 'CmdOrCtrl+X',
      //     role: 'cut',
      //   },
      //   {
      //     label: 'Copy',
      //     accelerator: 'CmdOrCtrl+C',
      //     role: 'copy',
      //   },
      //   {
      //     label: 'Copy Current URL',
      //     accelerator: 'CmdOrCtrl+L',
      //     click: () => {
      //       const currentURL = getCurrentUrl();
      //       clipboard.writeText(currentURL);
      //     },
      //   },
      //   {
      //     label: 'Paste',
      //     accelerator: 'CmdOrCtrl+V',
      //     role: 'paste',
      //   },
      //   {
      //     label: 'Paste and Match Style',
      //     accelerator: 'CmdOrCtrl+Shift+V',
      //     role: 'pasteandmatchstyle',
      //   },
      //   {
      //     label: 'Select All',
      //     accelerator: 'CmdOrCtrl+A',
      //     role: 'selectall',
      //   },
        {
          label: 'Flush App Data',
          click: () => {
            clearAppData();
          },
        },
      ],
    },
    {
      label: 'View',
      submenu: [
        {
          label: 'Back',
          accelerator: 'CmdOrCtrl+[',
          click: () => {
            goBack();
          },
        },
        {
          label: 'Forward',
          accelerator: 'CmdOrCtrl+]',
          click: () => {
            goForward();
          },
        },
        {
          label: 'Reload',
          accelerator: 'CmdOrCtrl+R',
          click: (item, focusedWindow) => {
            if (focusedWindow) {
              focusedWindow.reload();
            }
          },
        },
        {
          type: 'separator',
        },
        {
          label: 'Toggle Full Screen',
          accelerator: (() => {
            if (process.platform === 'darwin') {
              return 'Ctrl+Command+F';
            }
            return 'F11';
          })(),
          click: (item, focusedWindow) => {
            if (focusedWindow) {
              focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
            }
          },
        },
        {
          label: 'Zoom In',
          accelerator: (() => {
            if (process.platform === 'darwin') {
              return 'Command+=';
            }
            return 'Ctrl+=';
          })(),
          click: () => {
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
          click: () => {
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
          click: () => {
            zoomReset();
          },
        },
        // {
        //   label: 'Toggle Developer Tools',
        //   accelerator: (() => {
        //     if (process.platform === 'darwin') {
        //       return 'Alt+Command+I';
        //     }
        //     return 'Ctrl+Shift+I';
        //   })(),
        //   click: (item, focusedWindow) => {
        //     if (focusedWindow) {
        //       focusedWindow.toggleDevTools();
        //     }
        //   },
        // },
      ],
    },
    {
      label: 'About',
      role: 'help',
      submenu: [
        {
          label: `Built with Golem v${golemVersion}`,
          click: () => {
            shell.openExternal('https://github.com/loouislow81');
          },
        }
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
