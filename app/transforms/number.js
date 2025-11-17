function isNumber(value) {
  return value === value && value !== Infinity && value !== -Infinity;
}

export default class NumberTransform {
  deserialize(serialized, _options) {
    if (serialized === '' || serialized === null || serialized === undefined) {
      return null;
    } else {
      const transformed = Number(serialized);
      return isNumber(transformed) ? transformed : null;
    }
  }
  serialize(deserialized, _options) {
    if (deserialized === '' || deserialized === null || deserialized === undefined) {
      return null;
    } else {
      const transformed = Number(deserialized);
      return isNumber(transformed) ? transformed : null;
    }
  }
  static create() {
    return new this();
  }
}

