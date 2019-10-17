/* eslint-env node */
'use strict';

module.exports = function(deployTarget) {
  let ENV = {
    build: {
      outputPath: 'dist',
    },
    revision-data: {
      type: 'git-tag-commit',
    },
    gzip: {
      keep: true,
    },
  };

  if (deployTarget === 'development') {
    ENV.build.environment = 'development';
  }

  if (deployTarget === 'staging') {
    ENV.build.environment = 'production';

    ENV['rsync-assets'] = {
      destination: '/opt/acao-services/',
      source: 'tmp/deploy-dist/.',
      excludeIndexHTML: false,
    }
  }

  if (deployTarget === 'production') {
    ENV.build.environment = 'production';

    ENV['rsync-assets'] = {
      destination: 'yggdra@iserver.acao.it:/opt/acao-services/',
      source: 'tmp/deploy-dist/.',
      excludeIndexHTML: false,
      ssh: true,
    }
  }

  return ENV;
};
