import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import Evented from '@ember/object/evented';
import { Promise } from 'rsvp';

export default class SessionService extends Service.extend(Evented) {
  @service store;
  @service ajax;
  @service('vihai-object-streaming') vos;

  @tracked isAuthenticated = false;

  @tracked personId = null;
  @tracked person = null;

  @tracked isLoaded = false;

  load() {
    return new Promise((resolve, reject) => {
      this.ajax.post('/ygg/session/check_or_create', {
        timeout: 5000,
        contentType: 'application/json',
        data: {},
      }).then((response) => {
        this.isLoaded = true;
        this.update(response).then(() => (resolve(response))).catch((error) => (reject(error)));
      }).catch((error) => {
        reject(error);
      });
    });
  }

  authenticate(fqda, password) {
    this.set('authenticating', true);

    return new Promise((resolve, reject) => {
      this.ajax.post('/ygg/session/authenticate_by_fqda_and_password', {
        contentType: 'application/json',
        data: {
          fqda: fqda,
          password: password
        }
      }).then((response) => {
        this.set('authenticating', false);

        this.update(response).then(() => {
          if (response.authenticated) {
            resolve(response);
          } else {
            reject(response);
          }
        }).catch((error) => {
          reject(error);
        });

      }).catch((error) => {
        this.set('authenticating', false);
        reject(error);
      });
    });
  }

  proxyAuthenticate(fqda, password, other_fqda) {
    this.set('authenticating', true);

    return new Promise((resolve, reject) => {
      this.ajax.post('/ygg/session/proxy_authenticate_by_fqda_and_password', {
        contentType: 'application/json',
        data: {
          fqda: fqda,
          password: password,
          other_fqda: other_fqda,
        }
      }).then((response) => {
        this.set('authenticating', false);

        this.update(response).then(() => {
          if (response.authenticated) {
            resolve(response);
          } else {
            reject(response);
          }
        }).catch((error) => {
          reject(error);
        });

      }).catch((error) => {
        this.set('authenticating', false);
        reject(error);
      });
    });
  }

  logout() {
    console.log('LOGOUT...');

    return new Promise((resolve, reject) => {
      this.ajax.post('/ygg/session/logout', {
        data: {},
        contentType: 'application/json',
      }).then((response) => {
        this.update(response).then(() => (resolve(response))).catch((error) => (reject(error)));
      })
    });
  }

  update(sessionData) {
    let oldAuthenticated = this.isAuthenticated;

    this.sessionId = sessionData.id;
    this.capabilities = sessionData.capabilities;
    this.authMethod = sessionData.auth_method;
    this.isAuthenticated = sessionData.authenticated;

    return new Promise((resolve, reject) => {
      if (!oldAuthenticated && sessionData.authenticated) {
        this.personId = sessionData.auth_person.id;

        this.trigger('sessionBecomesAuthenticated', arguments);

        this.store.findRecord('ygg--core--person', this.personId).then((person) => {
          this.person = person;
          resolve();
        }).catch((error) => {
          reject(error);
        });
      } else if (oldAuthenticated && !sessionData.authenticated) {
        this.set('personId', null);
        this.trigger('sessionBecomesNotAuthenticated', arguments);
        resolve();
      } else {
        resolve();
      }
    });
  }
}
