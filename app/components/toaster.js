import Component from '@glimmer/component';
import { service } from '@ember/service';
import { action } from '@ember/object';

export default class ToasterComponent extends Component {
  @service toaster;

  get toasts() {
    return this.toaster.toasts;
  }

  @action close(toast) {
    this.toaster.close(toast);
  }
}
