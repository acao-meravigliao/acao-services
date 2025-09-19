import Service from '@ember/service';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import Evented from '@ember/object/evented';
import { Promise } from 'rsvp';
import { later, cancel } from '@ember/runloop';
import { VihaiException, RemoteException } from '@vihai/vihai-exceptions';

class SessionLoadTimeout extends VihaiException { type = 'SessionLoadTimeout'; }
class WrongCredentials extends VihaiException { type = 'WrongCredentials'; }
class ServerFailure extends VihaiException { type = 'ServerFailure'; }
class ServerError extends RemoteException { }

export default class SessionService extends Service.extend(Evented) {
  @service store;
  @service vos;
  @service visibility;

  @tracked is_authenticated = false;
  @tracked authenticating = false;

  @tracked person_id = null;
  @tracked person = null;

  @tracked active = false;
  @tracked expires = null;
  @tracked last_action = null;

  @tracked is_loaded = false;

  constructor() {
    super(...arguments);

    this.visibility.on('change', () => {
      if (this.visibility.visible) {
        this.activity();
      }
    });

    let cb = this.activity.bind(this);

    document.ontouchstart = cb;
    document.onclick = cb;
    document.onkeydown = cb;

    window.addEventListener('beforeunload', () => {
      if (this.active && this.expires) {
        this.logout();
      }
    });
  }

  async load() {
    let res;

    if (this.is_loaded)
      return;

    let abc = new AbortController();
    setTimeout(() => abc.abort(), 5000);

    try {
      res = await fetch('/ygg/session/check_or_create', {
        method: 'POST',
        signal: abc.signal,
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'Accept': 'application/json',
        },
        body: JSON.stringify({}),
      });
    } catch(e) {
      if (e instanceof Error && e.name === 'AbortError') {
        throw(new SessionLoadTimeout);
      } else
        throw(e);
    }

    if (res.ok) {
      if (!res.headers.get('content-type').startsWith('application/json')) {
        throw(new ServerFailure);
      }

      let json = await res.json();

      await this.update(json);

      this.is_loaded = true;

      return json;

    } else {
      if (!res.headers.get('content-type').startsWith('application/problem+json')) {
        throw(new ServerFailure);
      }

      let json = await res.json();

      throw(new ServerError(json));
    }
  }

  async authenticate(fqda, password, opts) {
    opts = opts || {};

    this.authenticating = true;

    let abc = new AbortController();
    setTimeout(() => abc.abort(), 10000);

    let res = await fetch('/ygg/session/authenticate_by_fqda_and_password', {
      method: 'POST',
      signal: abc.signal,
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        fqda: fqda,
        password: password,
        keep_connected: opts.keep_connected,
      }),
    });

    if (res.ok) {
      if (!res.headers.get('content-type').startsWith('application/json')) {
        throw(new ServerFailure);
      }

      let json = await res.json();

      this.last_reported_activity = new Date();

      await this.update(json);

      if (json.authenticated) {
        return json;
      } else {
        let a = new WrongCredentials;
        throw new WrongCredentials;
      }

    } else {
      if (!res.headers.get('content-type').startsWith('application/problem+json')) {
        throw(new ServerFailure);
      }

      let json = await res.json();

      throw(new ServerError(json));
    }
  }

  async proxy_authenticate(fqda, password, other_fqda) {
    this.authenticating = true;

    let abc = new AbortController();
    setTimeout(() => abc.abort(), 10000);

    let res = await fetch('/ygg/session/proxy_authenticate_by_fqda_and_password', {
      method: 'POST',
      signal: abc.signal,
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        fqda: fqda,
        password: password,
        other_fqda: other_fqda,
      }),
    });

    if (res.ok) {
      if (!res.headers.get('content-type').startsWith('application/json')) {
        throw(new ServerFailure);
      }

      let json = await res.json();

      this.last_reported_activity = new Date();

      await this.update(json);

      if (json.authenticated) {
        return json;
      } else {
        let a = new WrongCredentials;
        throw new WrongCredentials;
      }

    } else {
      if (!res.headers.get('content-type').startsWith('application/problem+json')) {
        throw(new ServerFailure);
      }

      let json = await res.json();

      throw(new ServerError(json));
    }
  }

  async authenticate_by_keyfob(keyfob_id, opts) {
    opts = opts || {};

    this.authenticating = true;

    let abc = new AbortController();
    setTimeout(() => abc.abort(), 10000);

    let res = await fetch('/ygg/session/authenticate_by_keyfob', {
      method: 'POST',
      signal: abc.signal,
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        keyfob_id: keyfob_id,
        keep_connected: opts.keep_connected,
      }),
    });

    if (res.ok) {
      if (!res.headers.get('content-type').startsWith('application/json')) {
        throw(new ServerFailure);
      }

      let json = await res.json();

      this.last_reported_activity = new Date();

      await this.update(json);

      if (json.authenticated) {
        return json;
      } else {
        let a = new WrongCredentials;
        throw new WrongCredentials;
      }

    } else {
      if (!res.headers.get('content-type').startsWith('application/problem+json')) {
        throw(new ServerFailure);
      }

      let json = await res.json();

      throw(new ServerError(json));
    }
  }

  async logout() {
    console.log('LOGOUT...');

    this.idle_timer_stop();

    let abc = new AbortController();
    setTimeout(() => abc.abort(), 5000);

    let res = await fetch('/ygg/session/logout', {
      method: 'POST',
      signal: abc.signal,
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Accept': 'application/json',
      },
      body: JSON.stringify({}),
    });

    if (res.ok) {
      if (!res.headers.get('content-type').startsWith('application/json')) {
        throw(new ServerFailure);
      }

      let json = await res.json();

      await this.update(json);
    } else {
      if (!res.headers.get('content-type').startsWith('application/problem+json')) {
        throw(new ServerFailure);
      }

      let json = await res.json();

      throw(new ServerError(json));
    }
  }

  async recover(username) {
    let req = {
      acao_code: username,
    };

    let abc = new AbortController();
    setTimeout(() => abc.abort(), 10000);

    let res;
    try {
      res = await fetch('/ygg/acao/password_recovery', {
        method: 'POST',
        signal: abc.signal,
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'Accept': 'application/json',
        },
        body: JSON.stringify(req),
      });
    } catch(e) {
      if (e instanceof Error && e.name === 'AbortError') {
        throw(new RequestTimeout);
      } else
        throw(e);
    } finally {
    }

    if (res.ok) {
      if (!res.headers.get('content-type').startsWith('application/json')) {
        throw(new ServerFailure);
      }

      let json = await res.json();

      return json;

    } else {
      if (!res.headers.get('content-type').startsWith('application/problem+json')) {
        throw(new ServerFailure);
      }

      let json = await res.json();

      throw(new ServerError(json));
    }
  }

  activity() {
    this.last_activity = new Date();

    if (this.active && this.expires) {
      if (!this.last_reported_activity || ((this.last_activity - this.last_reported_activity) > 60000)) {
        this.refresh();
      } else {
        this.idle_timer_start();
      }
    }
  }

  async update(session_data) {
    let old_authenticated = this.is_authenticated;

    this.session_id = session_data.id;
    this.is_authenticated = session_data.authenticated;
    this.capabilities = session_data.capabilities;
    this.auth_method = session_data.auth_method;

    this.active = session_data.active;
    this.expires = session_data.expires ? new Date(session_data.expires) : null;

    if (!old_authenticated && session_data.authenticated) {
      this.person_id = session_data.auth_person.id;

      this.trigger('session_becomes_authenticated', arguments);

    } else if (old_authenticated && !session_data.authenticated) {
      this.person_id = null;
      this.trigger('session_becomes_not_authenticated', arguments);
    }

    if (this.expires) {
      this.activity();
    }
  }

  idle_timer_start() {
    let timeout = this.expires - new Date();

    this.idle_timer_stop();

    this.idle_timer = later(this, this.idle_timer_fired, timeout);
  }

  idle_timer_stop() {
    if (this.idle_timer) {
      cancel(this.idle_timer);
      this.idle_timer = null;
    }
  }

  idle_timer_fired() {
    this.logout();
  }

  refresh() {
    this.last_reported_activity = new Date();

    fetch('/ygg/session/refresh', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Accept': 'application/json',
      },
      body: JSON.stringify({}),
    }).then((res) => {
      if (res.headers.get('content-type').startsWith('application/json'))
        return res.json().then((json) => ([res, json]));
      else
        throw new ServerFailure;
    }).then(([ res, json ]) => {
      this.update(json);
    }).catch((e) => {
      console.error("Session refresh error:", e);
    });
  }
}
