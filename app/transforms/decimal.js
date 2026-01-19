import Decimal from 'decimal.js';

export default class DecimalTransform {
  deserialize(serialized, _options) {
    if (serialized === '' || serialized === null || serialized === undefined) {
      return null;
    } else {
      return new Decimal(serialized);
    }
  }

  serialize(deserialized, _options) {
    if (deserialized === '' || deserialized === null || deserialized === undefined) {
      return null;
    } else {
      return deserialized.toString();
    }
  }

  static create() {
    return new this();
  }
}

