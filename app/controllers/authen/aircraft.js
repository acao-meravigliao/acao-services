import Controller from '@ember/controller';
import { service } from '@ember/service';
import { action } from '@ember/object';
import { inject as controller } from '@ember/controller';

export default class AuthenAircraftController extends Controller {
  @service session;
  @service router;
  @controller('authen') authen_controller;

  ac_images = {
    null: '/assets/tug_wh.svg',
    'GLD': '/assets/glider_wh.svg',
    'SEP': '/assets/tug_wh.svg',
  };

  ac_image = (ac) => (this.ac_images[ac.aircraft_type.aircraft_class]);

  @action goto_flights() {
    this.router.transitionTo('authen.flights-by-ac', this.model.id);
  }
}
