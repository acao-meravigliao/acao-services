import Component from '@glimmer/component';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class ExceptionDecodeComponent extends Component {
  @service intl;

  get title() {
    return this.args.ex && (
             this.intl.lookup(`${this.args.ex.type}.title`, null, { resilient: true }) ||
             this.intl.lookup(this.args.ex.title_sym, null, { resilient: true }) ||
             this.args.ex.title) ||
           this.intl.t('exception_decoder.unexpected.title');
  }

  get detail() {
    return this.args.ex && (
             this.intl.lookup(`${this.args.ex.type}.detail`, null, { resilient: true }) ||
             this.intl.lookup(this.args.ex.detail_sym, null, { resilient: true }) ||
             this.args.ex.detail) ||
           this.intl.t('exception_decoder.unexpected.detail');
  }

  get backtrace() {
    return this.args.ex ? (this.args.ex.is_ygg_exception ? this.args.ex.backtrace : this.args.ex.stack) : [];
  }
}
