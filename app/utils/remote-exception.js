import MyException from 'acao-services/utils/my-exception';

export default class RemoteException extends MyException {
  constructor(error) {
console.log("IIIIIIIIIIIIIIIIIIIIIIIIIIIIII CONSTRUCTOR", error);
    super(error);

    if (error instanceof Response) {
      this.type = json.type;
      this.title_sym = json.title_sym;
      this.detail_sym = json.detail_sym;
      this.backtrace = json.backtrace;
      this.stack = json.stack;
    }
  }
}
