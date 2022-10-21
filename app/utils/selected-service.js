import EmberObject from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class SelectedService extends EmberObject {
  @tracked type;
  @tracked extra_info;
}
