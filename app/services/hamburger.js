import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class HamburgerService extends Service {
  @tracked active = false;

  toggle() {
    this.active = !this.active;

console.log("AAAAAAAAAAAAAAA ACTIVE", this.active);
  }
}
