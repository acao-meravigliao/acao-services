import MyException from 'acao-services/utils/my-exception';

export default class RemoteException extends MyException {
  constructor(e) {
     console.log("IIIIIIIIIIIIIIIIIIIIIIIIIIIIII CONSTRUCTOR", e);

    super(e);

console.log("GGGGGGGGGGGGGGGGGG 0", typeof e);

    if (e instanceof Response) {
console.log("GGGGGGGGGGGGGGGGGG 1");
      this.type = json.type;
      this.title_sym = json.title_sym;
      this.detail_sym = json.detail_sym;
      this.backtrace = json.backtrace;
      this.stack = json.stack;
    } else if (typeof e == 'object' && e.is_ygg_exception) {
console.log("GGGGGGGGGGGGGGGGGG 2", this);
      this.type = e.type;
      this.title_sym = e.title_sym;
      this.detail_sym = e.detail_sym;
      this.backtrace = e.backtrace;
      this.stack = e.stack;
    }
  }
}
