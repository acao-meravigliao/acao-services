import Ember from 'ember';
import BaseAuthenticator from 'ember-simple-auth/authenticators/base';

export default BaseAuthenticator.extend({
  restore: function(data) {

console.log("RESTOREEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE-.---------------------------------------------------------", data);

    return new Ember.RSVP.Promise(function (resolve, reject) {
      Ember.$.ajax({
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
console.log("AUTHENTICATE EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE-.---------------------------------------------------------", fqda, password);

    return new Ember.RSVP.Promise(function(resolve, reject) {

      Ember.$.ajax({
        type: 'POST',
        url: '/ygg/session/check_or_create',
        data: JSON.stringify({}),
        dataType: 'json',
      }).then(function(response) {
        if (!response.authenticated) {
          Ember.$.ajax({
            type: 'POST',
            url: '/ygg/session/authenticate_by_fqda_and_password',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify({
              fqda: fqda,
              password: password
            })
          }).then(function(response) {
            if (response.authenticated)
              resolve(response);
            else
              reject(response);
          }, function(xhr, status, error) {
              reject(xhr.responseJSON || xhr.responseText);
          });
        } else {
          resolve(response);
        }
      }, function(xhr, status, error) {
        reject(xhr.responseJSON || xhr.responseText);
      });
    });
  },

  invalidate: function() {
    console.log('invalidate...');

    return new Ember.RSVP.Promise(function(resolve, reject) {
      Ember.$.ajax({
        type: 'POST',
        url: '/ygg/session/logout',
      }).then(function(response) {
        Ember.run(function() {
          resolve(response);
        });
      }, function(xhr, status, error) {
        Ember.run(function() {
          reject(xhr.responseJSON || xhr.responseText);
        });
      });
    });
  },
});
