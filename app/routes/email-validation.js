import Route from '@ember/routing/route';
import { VihaiException, RemoteException } from '@vihai/vihai-exceptions';

class ServerFailure extends VihaiException { type = 'ServerFailure'; }
class ServerError extends RemoteException { }

export default class EmailValidationRoute extends Route {
  queryParams = {
    code: {
      refreshModel: true,
      replace: true,
    },
  };

  async model(params) {
    let abc = new AbortController();
    setTimeout(() => abc.abort(), 5000);

//    try {
      let res = await fetch('/ygg/ml/addresses/validate', {
        method: 'POST',
        signal: abc.signal,
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ code: params.code }),
      });
//    } catch(e) {
//      if (e instanceof Error && e.name === 'AbortError') {
//        throw(new SessionLoadTimeout);
//      } else
//        throw(e);
//    }

    if (res.ok) {
      if (!res.headers.get('content-type').startsWith('application/json')) {
        throw(new ServerFailure);
      }

      return await res.json();
    } else {
      if (!res.headers.get('content-type').startsWith('application/problem+json')) {
        throw(new ServerFailure);
      }

      let json = await res.json();

      throw(new ServerError(json));
    }
  }
}
