import Controller from '@ember/controller';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
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

  // FIXME: ac.aircraft_type will be made mandatory
  ac_image = (ac) => (this.ac_images[ac.aircraft_type && ac.aircraft_type.aircraft_class || 'GLD']);

  get aircraft() {
    return this.model.get_first('ygg--acao--aircraft');
  }

  get sync_statuses() {
    return this.model.get_all('ygg--acao--aircraft-sync-status');
  }

  fn_mismatch_device_id = (fe) => (fe.device_type === 'F' ?
                                  fe.device_id != this.aircraft.flarm_identifier :
                                  fe.device_id != this.aircraft.icao_identifier);

  fn_mismatch_reg = (fe) => (fe.registration != this.aircraft.registration);
  fn_mismatch_cn = (fe) => (fe.cn != this.aircraft.race_registration);

  ddb_mismatch_device_id = (fe) => (fe.device_type === 'F' ?
                                  fe.device_id != this.aircraft.flarm_identifier :
                                  fe.device_id != this.aircraft.icao_identifier);

  ddb_mismatch_reg = (fe) => (fe.aircraft_registration != this.aircraft.registration);
  ddb_mismatch_cn = (fe) => (fe.aircraft_competition_id != this.aircraft.race_registration);

  @action goto_flights() {
    this.router.transitionTo('authen.flight.index-by-ac', this.aircraft.id);
  }

  get flarmnet_last_update() {
    let sync = this.sync_statuses.find((x) => (x.symbol === 'FLARMNET'));
    return sync ? sync.last_update : null;
  }

  get ddb_last_update() {
    let sync = this.sync_statuses.find((x) => (x.symbol === 'OGNDDB'));
    return sync ? sync.last_update : null;
  }

  @tracked file;

  @action upload_photo(file) {
    this.file = file;

    var res = file.uploadBinary(`/ygg/acao/aircrafts/${this.aircraft.id}/upload_photo`, {
      accepts: 'application/json',
    }).finally(() => {
      this.file = null;
    });
  }
}
