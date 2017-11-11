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

  this.route('renew-membership', function() {
    this.route('data');
  });

  this.route('pending-payments');
  this.route('pending-payment', { path: '/pending-payment/:id' });

  this.route('select-roster');

  this.route('public', function() {
    this.route('today-roster');
  });
});

export default Router;
