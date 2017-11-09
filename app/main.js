'use strict';

var path = require('path');
var { exec } = require('child_process');
var { app, Menu, Tray } = require('electron');

var iconPath = path.join(__dirname, 'asset/IconTemplate@2x.png');
console.log(iconPath)
function exitApplication (app) {
  app.quit();
};
function toggleHidden () {
  exec('defaults read com.apple.finder AppleShowAllFiles', (err, stdout, stderr) => {
    if (stdout.toString().replace(/\n$/, '') === 'YES') {
      exec('defaults write com.apple.finder AppleShowAllFiles NO && killall Finder', (err, stdout, stderr) => {
        if (err) {
          return;
        } else {
          return;
        }
      });
    } else if (stdout.toString().replace(/\n$/, '') === 'NO') {
      exec('defaults write com.apple.finder AppleShowAllFiles YES && killall Finder', (err, stdout, stderr) => {
        if (err) {
          return;
        } else {
          return;
        };
      });
    }
  });
};
app.on('ready', () => {
  var tray = new Tray(iconPath);
  var contextMenu = Menu.buildFromTemplate([
    {
      click (event) {
        toggleHidden()
      },
      id: 'toggle',
      label: 'Show/Hide',
      type: 'normal'
    },
    {
      id: 'separator',
      label: null,
      type: 'separator'
    },
    {
      click () {
        exitApplication(app)
      },
      id: 'exit',
      label: 'Exit',
      type: 'normal'
    }
  ]);
  tray.setContextMenu(contextMenu);
});

app.dock.hide();
