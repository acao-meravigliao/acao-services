export default class StringTransform {
  deserialize(serialized, _options) {
    return !serialized && serialized !== '' ? null : String(serialized);
  }
  serialize(deserialized, _options) {
    return !deserialized && deserialized !== '' ? null : String(deserialized);
  }
  static create() {
    return new this();
  }
}
