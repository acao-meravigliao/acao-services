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
    fingerprint: {
      exclude: [
        'images/layers-2x.png',
        'images/layers.png',
        'images/marker-icon-2x.png',
        'images/marker-icon.png',
        'images/marker-shadow.png'
      ]
    },
    'ember-cli-favicon': {
      faviconsConfig: {
        icons: {
        },
      },
    },
  });
  return compatBuild(app, buildOnce, {
    staticAddonTestSupportTrees: true,
    staticAddonTrees: true,
    staticHelpers: true,
    staticModifiers: true,
    staticComponents: true,
    staticEmberSource: true
  });
};
