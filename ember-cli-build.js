'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

//------------ Embroider workaround https://github.com/emberjs/data/issues/8396
const fs = require('fs');
fs.writeFileSync(
  `node_modules/@ember-data/private-build-infra/addon/available-packages.ts`,
  `export default {
  HAS_EMBER_DATA_PACKAGE: 'ember-data',
  HAS_STORE_PACKAGE: '@ember-data/store',
  HAS_MODEL_PACKAGE: '@ember-data/model',
  HAS_RECORD_DATA_PACKAGE: '@ember-data/record-data/-private',
  HAS_ADAPTER_PACKAGE: '@ember-data/adapter',
  HAS_SERIALIZER_PACKAGE: '@ember-data/serializer',
  HAS_DEBUG_PACKAGE: '@ember-data/debug',
};`
);
//------------------------

module.exports = function (defaults) {
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
          appleStartup: false,
        },
      },
    },
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  //return app.toTree();

  const { Webpack } = require('@embroider/webpack');
  return require('@embroider/compat').compatBuild(app, Webpack, {
    skipBabel: [
      {
        package: 'qunit',
      },
    ],
  });
};
