/* eslint-env node */
'use strict';

module.exports = function(deployTarget) {
  let ENV = {
    build: {}
    // include other plugin configuration that applies to all deploy targets here
  };

  if (deployTarget === 'development') {
    ENV.build.environment = 'development';
    // configure other plugins for development deploy target here
  }

  if (deployTarget === 'staging') {
    ENV.build.environment = 'production';
    // configure other plugins for staging deploy target here
  }

  if (deployTarget === 'production') {
    ENV.build.environment = 'production';

    //ENV.plugins = 'build rsync-assets'.split(' ');
    ENV.build = { environment: 'production' };

//    ENV['scp'] = {
//      nodes: [{
//        username: 'yggdra',
//        host: 'iserver.acao.it',
//        path: '/opt/acao-services-deploytest',
//      }],
//    }
    ENV['rsync-assets'] = {
      destination: 'yggdra@iserver.acao.it:/opt/acao-services-deploytest/',
      source: 'tmp/deploy-dist/.',
      excludeIndexHTML: false, // default is `true` to exclude index.html
//      flags: ['z'], // compress, gzip
      ssh: true,
//      privateKeyPath: process.env['PRIVATE_KEY_PATH']
    }
  }

  // Note: if you need to build some configuration asynchronously, you can return
  // a promise that resolves with the ENV object instead of returning the
  // ENV object synchronously.
  return ENV;
};
