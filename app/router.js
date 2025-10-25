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

    this.route('people');
    this.route('person', { path: '/person/:id' });

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

    this.route('licenses');
    this.route('medicals');

    this.route('payments');
    this.route('payment', { path: '/payment/:id' });

    this.route('invoices');
    this.route('invoice', { path: '/invoice/:id' });

    this.route('debt', function() {
      this.route('index');
      this.route('show', { path: '/show/:id' });
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

    this.route('flights');
    this.route('flights-by-ac', { path: '/flights-by-ac/:id' });
    this.route('flight', { path: '/flight/:id' });
    this.route('flight-new', { path: '/flight/new' });

    this.route('aircrafts');
    this.route('aircraft', { path: '/aircraft/:id' });

    this.route('aircraft-types');
    this.route('aircraft-type', { path: '/aircraft-type/:id' });

    this.route('clubs');
    this.route('club', { path: '/club/:id' });

    this.route('airfield', { path: '/airfield/:id' });

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

//  this.route('roster', function() {
//    this.route('today');
//    this.route('days');
//  });
//
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
