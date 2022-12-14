import JSONAPISerializer from '@ember-data/serializer/json-api';

export default class ApplicationSerializer extends JSONAPISerializer {

  keyForAttribute(key) {
    return key;
  }

  keyForRelationship(key, typeClass, method) {
    return key;
  }

  modelNameFromPayloadKey(key) {
    return key.replace('_','-');
  }

  payloadTypeFromModelName(modelName) {
    return modelName;
  }

  serializeAttribute(snapshot, json, key, attribute) {
    if (attribute.options && attribute.options.readOnly)
      return;

    super.serializeAttribute(...arguments);
  }

  serializeHasMany(snapshot, json, relationship) {
    if (relationship.options && relationship.options.readOnly)
      return;

    super.serializeHasMany(...arguments);
  }

  serializeBelongsTo(snapshot, json, relationship) {
    if (relationship.options && relationship.options.readOnly)
      return;

    super.serializeBelongsTo(...arguments);
  }
}
