export default class MyException extends Error {

  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
}

