export default class DateTransform {
  deserialize(serialized, _options) {
    if (typeof serialized === 'string') {
      let offset = serialized.indexOf('+');
      if (offset !== -1 && serialized.length - 5 === offset) {
        offset += 3;
        return new Date(serialized.slice(0, offset) + ':' + serialized.slice(offset));
      }
      return new Date(serialized);
    } else if (typeof serialized === 'number') {
      return new Date(serialized);
    } else if (serialized === null || serialized === undefined) {
      // if the value is null return null
      // if the value is not present in the data return undefined
      return serialized;
    } else {
      return null;
    }
  }

  serialize(date, _options) {
    // @ts-expect-error isNaN accepts date as it is coercible
    if (date instanceof Date && !isNaN(date)) {
      return date.toISOString();
    } else {
      return null;
    }
  }

  static create() {
    return new this();
  }
}
