import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('login');
  this.route('radar');
  this.route('meteo');

  this.route('shop', function() {
    this.route('cart');
    this.route('checkout');
  });

  this.route('renew-membership', function() {
    this.route('data');
    this.route('summary');
  });

  this.route('pending-payments');
  this.route('pending-payment', { path: '/pending-payment/:id' });

  this.route('select-roster');

  this.route('today-roster');
  this.route('today-roster-not-found');

  this.route('roster-days');
});

export default Router;
