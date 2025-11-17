export default class BooleanTransform {
  deserialize(serialized, options) {
    if ((serialized === null || serialized === undefined) && options?.allowNull === true) {
      return null;
    }

    if (typeof serialized === 'boolean') {
      return serialized;
    } else if (typeof serialized === 'string') {
      return /^(true|t|1)$/i.test(serialized);
    } else if (typeof serialized === 'number') {
      return serialized === 1;
    } else {
      return false;
    }
  }

  serialize(deserialized, options) {
    if ((deserialized === null || deserialized === undefined) && options?.allowNull === true) {
      return null;
    }

    return Boolean(deserialized);
  }

  static create() {
    return new this();
  }
}
