export default class MyException extends Error {
  source = 'local';
  type = 'MyException';
  title;
  title_sym;
  detail;
  detail_sym;
  backtrace;

  title_text(intl) {
    this.title_sym = this.title_sym || `ex.local.${this.type}.title`;

    return intl.lookup(this.title_sym || `ex.local.${this.type}.title`, null, { resilient: true }) ||
           intl.lookup(`ex.remote.${this.type}.title`, null, { resilient: true }) ||
           this.title ||
           intl.t('ex.unexpected.title');
  }

  detail_text(intl) {
    return intl.lookup(this.detail_sym || `ex.local.${this.type}.detail`, null, { resilient: true }) ||
           intl.lookup(`ex.remote.${this.type}.detail`, null, { resilient: true }) ||
           this.detail ||
           intl.t('ex.unexpected.detail');

  }
}

