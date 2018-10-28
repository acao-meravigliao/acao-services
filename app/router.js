import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL,
});

Router.map(function() {
  this.route('authen', { path: '/' }, function() {
    this.route('index', { path: '/'});

    this.route('shop', function() {
      this.route('cart');
      this.route('checkout');
    });

    this.route('renew-membership', { path: '/renew-membership/:year' }, function() {
      this.route('data');
      this.route('summary');
    });

    this.route('people');
    this.route('person', { path: '/person/:id' });

    this.route('memberships');

    this.route('licenses');
    this.route('medicals');

    this.route('payments');
    this.route('payment', { path: '/payment/:id' });

    this.route('invoices');
    this.route('invoice', { path: '/invoice/:id' });

    this.route('roster-select', { path: '/roster-select/:year' });
    this.route('tow-roster-select', { path: '/tow-roster-select/:year' });

    this.route('bar-transactions');
    this.route('bar-transaction', { path: '/bar-transaction/:id' });

    this.route('token-transactions');
    this.route('token-transaction', { path: '/token-transaction/:id' });

    this.route('flights');
    this.route('flight', { path: '/flight/:id' });

    this.route('aircrafts');
    this.route('aircraft', { path: '/aircraft/:id' });

    this.route('aircraft-types');
    this.route('aircraft-type', { path: '/aircraft-type/:id' });

    this.route('clubs');
    this.route('club', { path: '/club/:id' });

    this.route('airfield', { path: '/airfield/:id' });
  });

  this.route('login');
  this.route('login2');
  this.route('password-recovery');

  this.route('radar');
  this.route('meteo');

  this.route('today-tow-roster');
  this.route('today-tow-roster-not-found');
  this.route('tow-roster-days');

  this.route('today-roster');
  this.route('today-roster-not-found');
  this.route('roster-days');
});

export default Router;
