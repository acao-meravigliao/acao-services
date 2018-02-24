import { run } from '@ember/runloop';
import $ from 'jquery';
import { Promise as EmberPromise } from 'rsvp';
import BaseAuthenticator from 'ember-simple-auth/authenticators/base';

export default BaseAuthenticator.extend({
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

    return new EmberPromise(function(resolve, reject) {
      $.ajax({
        type: 'POST',
        url: '/ygg/session/check_or_create',
        data: JSON.stringify({}),
        dataType: 'json',
      }).then(function(response) {
console.log("AUTHENTICATE OK", response);
        if (!response.authenticated) {
          $.ajax({
            type: 'POST',
            url: '/ygg/session/authenticate_by_fqda_and_password',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify({
              fqda: fqda,
              password: password
            })
          }).then(function(response) {
console.log("AUTHENTICATE THEN", response);
            if (response.authenticated)
              resolve(response);
            else
              reject(response);
          }, function(xhr, status, error) {
console.log("AUTHENTICATE FAIL", arguments);
            reject(xhr.responseJSON || xhr.responseText);
          });
        } else {
console.log("AUTHENTICATE RESOLVE RESPONSEEE", response);
          resolve(response);
        }
      }, function(xhr, status, error) {
        reject(xhr.responseJSON || xhr.responseText);
      });
    });
  },

  invalidate: function() {
    console.log('invalidate...');

    return new EmberPromise(function(resolve, reject) {
      $.ajax({
        type: 'POST',
        url: '/ygg/session/logout',
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
