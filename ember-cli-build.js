'use strict';;
const EmberApp = require('ember-cli/lib/broccoli/ember-app');

const {
  compatBuild
} = require("@embroider/compat");

module.exports = async function(defaults) {
  const {
    buildOnce
  } = await import("@embroider/vite");

  let app = new EmberApp(defaults, {
    sassOptions: {
      includePaths: [
        'node_modules/bulma',
      ],
      onlyIncluded: true,
    },
    'ember-cli-favicon': {
      faviconsConfig: {
        icons: {
        },
      },
    },
  });

  const { setConfig } = await import("@warp-drive/build-config");

  setConfig(app, __dirname, {
    deprecations: {
      DEPRECATE_TRACKING_PACKAGE: false,
    },
    polyfillUUID: true,
  });

  return compatBuild(app, buildOnce, {
    staticHelpers: true,
    staticModifiers: true,
    staticComponents: true,
  });
};
