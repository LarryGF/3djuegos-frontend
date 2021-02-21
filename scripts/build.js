/*jshint esversion: 6 */
/* jshint node: true */
/* jshint -W097 */
'use strict';

require('dotenv').config();

const builder = require('electron-builder');
const Platform = builder.Platform;

const options = {
  appId: 'AnimeCatalog',
  productName: 'AnimeCatalog',
  directories: {
    buildResources: 'static',
    output: 'compiled',
  },
  asar: 'true',
  compression: 'maximum',
  files: [
    'assets/**/*',
    'components/**/*',
    'layouts/**/*',
    'pages/**/*',
    'store/**/*',
    'node_modules/**/*',
    '.nuxt/**/*',
    'static/**/*',
    'nuxt.config.js',
    'main.js',
  ],
  linux: {
    target: 'AppImage',
  },
  win: {
    target: 'portable',
    verifyUpdateCodeSignature: 'false',
    signAndEditExecutable: 'false',
  },
  electronDownload: {
    customDir: process.env.ELECTRON_CACHED_FILE || null,
  },
};

const platformStr = process.argv[2];
var platforms = [];

const setPlatform = (platform) => {
  switch (platform) {
    case 'win':
      platforms.push(Platform.WINDOWS);
      break;

    case 'linux':
      platforms.push(Platform.LINUX);
      break;

    case 'mac':
      platforms.push(Platform.MAC);
      break;

    case 'w':
      platforms.push(Platform.WINDOWS);
      break;

    case 'l':
      platforms.push(Platform.LINUX);
      break;

    case 'm':
      platforms.push(Platform.MAC);
      break;
  }
};

if (platformStr.match('[wlm]{1,3}') && !platformStr.match('[^wlm]')) {
  for (const platform of platformStr) {
    setPlatform(platform);
  }
}

// Promise is returned
builder
  .build({
    targets: builder.createTargets(platforms),
    config: options,
  })

  .then(() => {
    // handle result
  })
  .catch((error) => {
    // handle error
    console.log(error);
  });
