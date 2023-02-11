import EmberObject from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class SelectedService extends EmberObject {
  @tracked type;
  @tracked enabled;
  @tracked toggable;
  @tracked removable;
  @tracked extra_info;

  constructor(data) {
    super(...arguments);

    this.removable = true;
    this.enabled = true;
    this.toggable = false;

    Object.assign(this, data);
  }
}
