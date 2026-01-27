'use strict';

const repo_info = require('git-repo-info')();

module.exports = function (environment) {

  const version = repo_info.lastTag +
                  ((repo_info.commitsSinceLastTag > 0) ? `-${repo_info.commitsSinceLastTag}` : '') +
                  `-g${repo_info.sha.substring(0,7)}`;
  console.log("VERSION=", version);

  const ENV = {
    modulePrefix: 'acao-services',
    environment,
    rootURL: '/',
    locationType: 'history',
    EmberENV: {
      EXTEND_PROTOTYPES: false,
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. EMBER_NATIVE_DECORATOR_SUPPORT: true
      },
      //EXTEND_PROTOTYPES: {
      //  // Prevent Ember Data from overriding Date.parse.
      //  Date: false,
      //},
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
      version: version,
    },

    authenticated_route: 'authen.index',
    login_route: 'login',
    vos_url: '/vos2',
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }

  if (environment === 'production') {
    ENV.airbrake = {
      host: 'https://errbit.vihai.it',
      projectId:  '1',
      projectKey: '8af5b361c917d0f581a40552ff4c1ac0'
    };
  }

  return ENV;
};
