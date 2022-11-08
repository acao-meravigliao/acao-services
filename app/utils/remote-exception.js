import MyException from 'acao-services/utils/my-exception';

export default class RemoteException extends MyException {
  source = 'remote';

  constructor(e) {
    console.log("REMOTE EXCEPTION", e);

    super(e.detail);

    if (e instanceof Response) {
      this.type = json.type;
      this.title_sym = json.title_sym;
      this.detail_sym = json.detail_sym;
      this.backtrace = json.backtrace;
      this.stack = json.stack;
    } else if (typeof e === 'object' && e.is_ygg_exception) {
      this.type = e.type;
      this.title_sym = e.title_sym;
      this.detail_sym = e.detail_sym;
      this.backtrace = e.backtrace;
      this.stack = e.stack;
    }
  }
}
