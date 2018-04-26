import BaseAuthenticator from 'ember-simple-auth/authenticators/base';
import { run } from '@ember/runloop';
import { Promise as EmberPromise } from 'rsvp';
import { inject as service } from '@ember/service';

export default BaseAuthenticator.extend({
  ajax: service(),

  restore: function(data) {
console.log("SESSION RESTORE");
    return new EmberPromise((resolve, reject) => {
      this.get('ajax').post('/ygg/session/check_or_create', {
        contentType: 'application/json',
        data: {},
      }).then((response) => {
        if (response.authenticated)
          resolve(response);
        else
          reject({});
      }).catch((error) => { reject(error); });
    });
  },

  authenticate: function(fqda, password) {
console.log("AUTHENTICATE");

    return new EmberPromise((resolve, reject) => {
console.log("AJAX");
      this.get('ajax').post('/ygg/session/check_or_create', {
        contentType: 'application/json',
        data: {},
      }).then((response) => {
console.log("AUTHENTICATE OK", response);
        if (!response.authenticated) {
          this.get('ajax').post('/ygg/session/authenticate_by_fqda_and_password', {
            contentType: 'application/json',
            data: {
              fqda: fqda,
              password: password
            }
          }).then((response) => {
console.log("AUTHENTICATE THEN", response);
            if (response.authenticated)
              resolve(response);
            else
              reject(response);
          }).catch((error) => {
console.log("AUTHENTICATE FAIL", arguments);
            reject(error);
          });
        } else {
console.log("AUTHENTICATE RESOLVE RESPONSEEE", response);
          resolve(response);
        }
      }).catch((error) => {
console.log("ERRRRRRRR", xhr, status, error);
        reject(error);
      });
    });
  },

  invalidate: function() {
    console.log('invalidate...');

    return new EmberPromise((resolve, reject) => {
      this.get('ajax').post('/ygg/session/logout', {
        data: {},
        contentType: 'application/json',
      }).then((response) => (run(() => (resolve(response))))
      ).catch((error) => run(() => (reject(error))))
    });
  },
});
