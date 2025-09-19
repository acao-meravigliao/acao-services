/* eslint-env node */
'use strict';

module.exports = function(deployTarget) {
  let ENV = {
    runOrder: {
      'json-config': { after: 'build' },
    },

    build: {
      outputPath: 'dist',
    },

    'revision-data': {
      type: 'git-commit',
    },

    gzip: {
      keep: true,
    },
  };

  switch(deployTarget) {
  case 'development':
    ENV.build.environment = 'development';
  break;

  case 'dev':
    ENV.build.environment = 'development';

    ENV['rsync-assets'] = {
      destination: '/opt/acao-services-dev/',
      source: 'dist/',
      excludeIndexHTML: false,
    }
  break;

  case 'staging':
    ENV.build.environment = 'production';

    ENV['rsync-assets'] = {
      destination: 'acao@fe.acao.it:/opt/acao-services-staging/',
      source: 'dist/',
      excludeIndexHTML: false,
      ssh: true,
    }
  break;

  case 'staging-lilc':
    ENV.build.environment = 'production';

    ENV['rsync-assets'] = {
      destination: 'yggdra@lino.acao.it:/opt/acao-services-staging/',
      source: 'dist/',
      excludeIndexHTML: false,
      ssh: true,
    }
  break;

  case 'production':
    ENV.build.environment = 'production';

    ENV['rsync-assets'] = {
      destination: 'acao@fe.acao.it:/opt/acao-services/',
      source: 'dist/',
      excludeIndexHTML: false,
      ssh: true,
    }
  break;

  case 'production-lilc':
    ENV.build.environment = 'production';

    ENV['rsync-assets'] = {
      destination: 'yggdra@lino.acao.it:/opt/acao-services/',
      source: 'dist/',
      excludeIndexHTML: false,
      ssh: true,
    }
  break;
  }

  return ENV;
};
