import Controller from '@ember/controller';
import { service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class ApplicationController extends Controller {
  @service session;
  @service vos;
  @service router;

  @tracked offline = false;

  constructor() {
    super(...arguments);

    this.vos.on('state_changed', this, this.on_vos_state_changed);
  }

  get fullscreen() {
    return this.router.currentRoute.name.startsWith('fs-');
  }

  on_vos_state_changed(new_state, old_state) {
console.log("VOS STATE CHANGED", old_state, new_state);
    if (new_state != 'READY' && old_state == 'READY') {
      this.offline = true;
    } else if (new_state == 'READY' && old_state != 'READY') {
      this.offline = false;
    }
  }

}
