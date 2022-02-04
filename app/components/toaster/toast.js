import Component from '@glimmer/component';
import { service } from '@ember/service';
import { action } from '@ember/object';

export default class ToasterToastComponent extends Component {
  @service toaster;

  @action close() {
    this.args.onclose(this.args.toast);
  }
}
