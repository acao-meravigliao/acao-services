import Controller from '@ember/controller';
import { service } from '@ember/service';
import { action } from '@ember/object';
import { inject as controller } from '@ember/controller';

export default class AuthenAircraftsController extends Controller {
  @service session;
  @service router;
  @controller('authen') authen_controller;

  ac_images = {
    null: '/assets/tug_wh.svg',
    'GLD': '/assets/glider_wh.svg',
    'SEP': '/assets/tug_wh.svg',
  };

  // FIXME ac.aircraft_type will be made mandatory
  ac_image = (ac) => (this.ac_images[ac.aircraft_type && ac.aircraft_type.aircraft_class || 'GLD']);

  get aircrafts() {
    return this.model.get_cls('ygg--acao--aircraft');
  }

  get club() {
    return this.model.get_first('ygg--acao--club');
  }

  get private_ac() {
    return this.aircrafts.filter((x) => (x.owners.some((y) => (y.member === this.authen_controller.member))));
  }

  get private_ac_sorted() {
    return this.private_ac.sort((a,b) => (a.registration - a.registration));
  }

  get shared_ac() {
    return this.aircrafts.filter((x) => (x.club_owner === this.club));
  }

  ac_compare(a,b) {
    // FIXME: make aircraft_type mandatory

    if (!a.aircraft_type || !b.aircraft_type || a.aircraft_type.aircraft_class === b.aircraft_type.aircraft_class)
      return 0;
    else {
      if (a.aircraft_type.aircraft_class === 'GLD')
        return -1;
      else
        return 1;
    }
  }

  get shared_ac_sorted() {
    return this.shared_ac.sort((a,b) => (this.ac_compare(a,b) || (a.registration - a.registration)));
  }
}
