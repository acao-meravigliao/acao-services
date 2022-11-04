import Service from '@ember/service';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import Evented from '@ember/object/evented';
import { Promise } from 'rsvp';
import fetch from 'fetch';
import MyException from 'acao-services/utils/my-exception';
import RemoteException from 'acao-services/utils/remote-exception';

class SessionLoadTimeout extends MyException { }
class WrongCredentials extends MyException { }
class AuthenticationServerFailure extends MyException { }
class AuthenticationServerError extends RemoteException { }

export default class SessionService extends Service.extend(Evented) {
  @service store;
  //@service('vihai-object-streaming') vos;

  @tracked is_authenticated = false;
  @tracked authenticating = false;

  @tracked person_id = null;
  @tracked person = null;

  @tracked is_loaded = false;

  async load() {
    let res;

    try {
      res = await fetch('/ygg/session/check_or_create', {
        method: 'POST',
        signal: AbortSignal.timeout(5000),
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'Accept': 'application/json',
        },
        body: JSON.stringify({}),
      });
    } catch(e) {
      if (e instanceof Error && e.name == 'AbortError') {
        throw(new SessionLoadTimeout);
      } else
        throw(e);
    }

    if (res.ok) {
      if (!res.headers.get('content-type').startsWith('application/json')) {
        throw(new AuthenticationServerFailure);
      }

      let json = await res.json();

      await this.update(json);

      this.is_loaded = true;

      return json;

    } else {
      if (!res.headers.get('content-type').startsWith('application/problem+json')) {
        throw(new AuthenticationServerFailure);
      }

      let json = await res.json();

      throw(new AuthenticationServerError(json));
    }
  }

  async authenticate(fqda, password) {
    this.authenticating = true;

    let res = await fetch('/ygg/session/authenticate_by_fqda_and_password', {
      method: 'POST',
      signal: AbortSignal.timeout(5000),
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        fqda: fqda,
        password: password
      }),
    });

    if (res.ok) {
      if (!res.headers.get('content-type').startsWith('application/json')) {
        throw(new AuthenticationServerFailure);
      }

      let json = await res.json();

      await this.update(json);

      if (json.authenticated) {
        return json;
      } else {
        throw new WrongCredentials;
      }

    } else {
      if (!res.headers.get('content-type').startsWith('application/problem+json')) {
        throw(new AuthenticationServerFailure);
      }

      let json = await res.json();

      throw(new AuthenticationServerError(json));
    }
  }

  proxyAuthenticate(fqda, password, other_fqda) {
    this.authenticating = true;

    return new Promise((resolve, reject) => {
      fetch('/ygg/session/proxy_authenticate_by_fqda_and_password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          fqda: fqda,
          password: password,
          other_fqda: other_fqda,
        }),
      }).then((res) => {
        this.update(res).then(() => {
          if (res.ok) {
            if (res.authenticated) {
              resolve(res);
            } else {
              reject(res);
            }
          } else
            reject(res);
        }).catch((error) => {
          reject(error);
        });

      }).catch((error) => {
        reject(error);
      }).finally(() => {
        this.authenticating = false;
      });
    });
  }

  async logout() {
    console.log('LOGOUT...');

    let res = await fetch('/ygg/session/logout', {
      method: 'POST',
      signal: AbortSignal.timeout(5000),
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Accept': 'application/json',
      },
      body: JSON.stringify({}),
    });

    if (res.ok) {
      if (!res.headers.get('content-type').startsWith('application/json')) {
        throw(new AuthenticationServerFailure);
      }

      let json = await res.json();

      await this.update(json);
    } else {
      if (!res.headers.get('content-type').startsWith('application/problem+json')) {
        throw(new AuthenticationServerFailure);
      }

      let json = await res.json();

      throw(new AuthenticationServerError(json));
    }
  }

  async update(session_data) {
    let old_authenticated = this.is_authenticated;

    this.session_id = session_data.id;
    this.capabilities = session_data.capabilities;
    this.auth_method = session_data.auth_method;
    this.is_authenticated = session_data.authenticated;

    if (!old_authenticated && session_data.authenticated) {
      this.person_id = session_data.auth_person.id;

      this.person = await this.store.findRecord('ygg--core--person', this.person_id)

      this.trigger('session_becomes_authenticated', arguments);

    } else if (old_authenticated && !session_data.authenticated) {
      this.person_id = null;
      this.trigger('session_becomes_not_authenticated', arguments);
    }
  }
}
