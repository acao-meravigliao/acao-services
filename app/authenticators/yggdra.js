import BaseAuthenticator from 'ember-simple-auth/authenticators/base';
import { run } from '@ember/runloop';
import { Promise as EmberPromise } from 'rsvp';
import { inject as service } from '@ember/service';

export default BaseAuthenticator.extend({
  ajax: service(),

  restore: function(data) {
console.log("RESTORE");
    return new EmberPromise(function (resolve, reject) {
      $.ajax({
        type: 'POST',
        url: '/ygg/session/check_or_create',
        data: JSON.stringify({}),
        dataType: 'json',
      }).then(function(response) {
        if (response.authenticated)
          resolve(response);
        else
          reject({});
      }, function(xhr, status, error) {
        reject(xhr.responseJSON || xhr.responseText);
      });
    });
  },

  authenticate: function(fqda, password) {
console.log("AUTHENTICATE");

    return new EmberPromise((resolve, reject) => {
console.log("AJAX");
      this.get('ajax').post('/ygg/session/check_or_create', {
        data: JSON.stringify({}),
//        dataType: 'json',
      }).then((response) => {
console.log("AUTHENTICATE OK", response);
        if (!response.authenticated) {
          this.get('ajax').post('/ygg/session/authenticate_by_fqda_and_password', {
//            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify({
              fqda: fqda,
              password: password
            })
          }).then((response) => {
console.log("AUTHENTICATE THEN", response);
            if (response.authenticated)
              resolve(response);
            else
              reject(response);
          }, (xhr, status, error) => {
console.log("AUTHENTICATE FAIL", arguments);
            reject(xhr.responseJSON || xhr.responseText);
          });
        } else {
console.log("AUTHENTICATE RESOLVE RESPONSEEE", response);
          resolve(response);
        }
      }).catch((xhr, status, error) => {
console.log("ERRRRRRRR", xhr, status, error);
        reject(xhr.responseJSON || xhr.responseText);
      });
    });
  },

  invalidate: function() {
    console.log('invalidate...');

    return new EmberPromise((resolve, reject) => {
      this.get('ajax').post('/ygg/session/logout', {
      }).then(function(response) {
        run(function() {
          resolve(response);
        });
      }, function(xhr, status, error) {
        run(function() {
          reject(xhr.responseJSON || xhr.responseText);
        });
      });
    });
  },
});
