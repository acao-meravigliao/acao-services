import EmberRouter from '@ember/routing/router';
import config from './config/environment';
import { inject as service } from '@ember/service';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL,
  headData: service(),
});

Router.map(function() {
  this.route('logged-in', { path: '/' }, function() {
    this.route('index', { path: '/'});

    this.route('shop', function() {
      this.route('cart');
      this.route('checkout');
    });

    this.route('renew-membership', function() {
      this.route('data');
      this.route('summary');
    });

    this.route('licenses');
    this.route('medicals');

    this.route('payments');
    this.route('payment', { path: '/payment/:id' });

    this.route('invoices');
    this.route('invoice', { path: '/invoice/:id' });

    this.route('select-roster');

    this.route('select-tow-roster');

    this.route('bar-transactions');

    this.route('token-transactions');

    this.route('flights');
    this.route('flight', { path: '/flight/:id' });

    this.route('aircrafts');
    this.route('aircraft', { path: '/aircraft/:id' });

    this.route('aircraft-types');
    this.route('aircraft-type', { path: '/aircraft-type/:id' });
  });

  this.route('login');
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
