import Component from '@glimmer/component';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import MyException from 'acao-services/utils/my-exception';
import RemoteException from 'acao-services/utils/remote-exception';

export default class ExceptionDecodeComponent extends Component {
  @service intl;

  get title() {
    let ex = this.args.ex;

    if (!ex)
      return '';

    if (ex instanceof RemoteException) {
      return (this.intl.lookup(`exception_decoder.remote.${ex.type}.title`, null, { resilient: true }) ||
              this.intl.lookup(ex.title_sym, null, { resilient: true }) ||
               ex.title) ||
             this.intl.t('exception_decoder.unexpected.title');
    } else {
      return this.intl.lookup(`exception_decoder.local.${ex.constructor.name}.title`, null, { resilient: true }) || ex.constructor.name;
    }
  }

  get detail() {
    let ex = this.args.ex;

    if (!ex)
      return '';

    if (ex instanceof RemoteException) {
      return (this.intl.lookup(`exception_decoder.remote.${ex.type}.detail`, null, { resilient: true }) ||
               this.intl.lookup(ex.detail_sym, null, { resilient: true }) ||
               ex.detail) ||
             this.intl.t('exception_decoder.unexpected.detail');
    } else {
      return this.intl.lookup(`exception_decoder.local.${ex.constructor.name}.detail`, null, { resilient: true }) || ex.constructor.name;
    }
  }

  get backtrace() {
    return this.args.ex ? (this.args.ex.is_ygg_exception ? this.args.ex.backtrace : this.args.ex.stack) : [];
  }
}
