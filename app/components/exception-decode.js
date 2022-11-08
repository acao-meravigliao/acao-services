import Component from '@glimmer/component';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import MyException from 'acao-services/utils/my-exception';
import RemoteException from 'acao-services/utils/remote-exception';

export default class ExceptionDecodeComponent extends Component {
  @service intl;

  get title() {
    let ex = this.args.ex;

    console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", ex, ex.name, ex.type, ex instanceof MyException);

    if (!ex)
      return '';

    if (ex instanceof MyException) {
console.log("AAAAAAAAA2", ex.type);
      return ex.title_text(this.intl);
    } else {
      return this.intl.lookup(`ex.local.${ex.name}.title`, null, { resilient: true }) ||
             ex.name;
    }
  }

  get detail() {
    let ex = this.args.ex;

    if (!ex)
      return '';

    if (ex instanceof MyException) {
      return ex.detail_text(this.intl);
    } else {
      return this.intl.lookup(`ex.local.${ex.name}.detail`, null, { resilient: true }) ||
             ex.name;
    }
  }

  get backtrace() {
    return this.args.ex ? (this.args.ex.is_ygg_exception ? this.args.ex.backtrace : this.args.ex.stack) : [];
  }
}
