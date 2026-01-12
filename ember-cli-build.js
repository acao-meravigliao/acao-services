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

  return compatBuild(app, buildOnce);
};
