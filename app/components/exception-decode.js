import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import config from 'kamaji-gui/config/environment';

export default class ExceptionDecodeComponent extends Component {
  @service intl;

  get title() {
    return this.intl.lookup(`${this.args.ex.type}.title`, null, { resilient: true }) ||
           this.intl.lookup(this.args.ex.title_sym, null, { resilient: true }) ||
           this.args.ex.title ||
           'Unspecified error';
  }

  get detail() {
    return this.intl.lookup(`${this.args.ex.type}.detail`, null, { resilient: true }) ||
           this.intl.lookup(this.args.ex.detail_sym, null, { resilient: true }) ||
           this.args.ex.detail;
  }
}
