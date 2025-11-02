import EmberRouter from '@ember/routing/router';
import config from './config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function() {
  this.route('authen', function() {
    this.route('shop', function() {
      this.route('cart');
      this.route('checkout');
    });

    this.route('membership', function() {
      this.route('index');
      this.route('renew', { path: '/renew/:year' }, function() {
        this.route('bio');
        this.route('bio-edit');
        this.route('aircraft-owned');
        this.route('aircraft-new');
        this.route('cap');
        this.route('rules');
        this.route('mailing');
        this.route('privacy');
        this.route('bill');
        this.route('roster-select');
        this.route('roster');
        this.route('summary');
        this.route('confirmation');
      });
    });

    this.route('medical', function() {
      this.route('index');
      this.route('show', { path: '/show/:id' });
    });

    this.route('license', function() {
      this.route('index');
      this.route('show', { path: '/show/:id' });
    });

    this.route('invoice', function() {
      this.route('index');
      this.route('show', { path: '/show/:id' });
    });

    this.route('debt', function() {
      this.route('index');
      this.route('show', { path: '/show/:id' });
    });

    this.route('payment', function() {
      this.route('index');
      this.route('show', { path: '/show/:id' });
      this.route('redirect-back', { path: '/redirect-back/:id' });
    });

    this.route('bar', function() {
      this.route('transactions');
      this.route('transaction', { path: '/transaction/:id' });
      this.route('recharge');
    });

    this.route('token', function() {
      this.route('transactions');
      this.route('transaction', { path: '/transaction/:id' });
    });

    this.route('aircraft', function() {
      this.route('index');
      this.route('show', { path: '/show/:id' });
    });

    this.route('aircraft-type', function() {
      this.route('index');
      this.route('show', { path: '/show/:id' });
    });

    this.route('airfield', function() {
      this.route('index');
      this.route('show', { path: '/show/:id' });
    });

    this.route('club', function() {
      this.route('index');
      this.route('show', { path: '/show/:id' });
    });

    this.route('flight', function() {
      this.route('index');
      this.route('index_by_ac');
      this.route('show', { path: '/show/:id' });
      this.route('new');
    });

    this.route('roster', function() {
      this.route('today');
      this.route('days');
      this.route('select', { path: '/select/:year' });
    });

//    this.route('tow-roster', function() {
//      this.route('today');
//      this.route('days');
//      this.route('select');
//    });
  });

//  this.route('tow-roster', function() {
//    this.route('today');
//    this.route('days');
//  });
//
//  this.route('sap', function() {
//    this.route('registration');
//    this.route('list');
//  });
//
//  this.route('ccv', function() {
//    this.route('registration');
//    this.route('list');
//  });

  this.route('login');
  this.route('login2');
  this.route('password-recovery');
  this.route('email-validation');

  this.route('initial-connection');
  this.route('offline');

  this.route('index.json');
  this.route('page-not-found', { path: '/*wildcard' });

});
