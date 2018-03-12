import EmberRouter from '@ember/routing/router';
import config from './config/environment';
import { inject as service } from '@ember/service';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL,
  headData: service(),

  setTitle(title, tokens) {
    this.get('headData').set('title', title);
    this.get('headData').set('titleTokens', tokens);
  },
});

Router.map(function() {
  this.route('login');
  this.route('password-recovery');

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

  this.route('payments');
  this.route('payment', { path: '/payment/:id' });

  this.route('select-roster');

  this.route('today-roster');
  this.route('today-roster-not-found');

  this.route('roster-days');

  this.route('bar-transactions');
  this.route('token-transactions');
  this.route('flights');
  this.route('flight', { path: '/flight/:id' });
  this.route('aircrafts');
  this.route('aircraft', { path: '/aircraft/:id' });
  this.route('aircraft-types');
  this.route('aircraft-type', { path: '/aircraft-type/:id' });
});

export default Router;
