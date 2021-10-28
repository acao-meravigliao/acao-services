import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
  keyForAttribute: function(key) {
    return key;
  },

  keyForRelationship(key, typeClass, method) {
    return key;
  },

  modelNameFromPayloadKey(key) {
    return key.replace('_','-');
  },

  payloadTypeFromModelName(modelName) {
    return modelName;
  },

  serializeAttribute(snapshot, json, key, attribute) {
    if (attribute.options && attribute.options.readOnly)
      return;

    this._super(...arguments);
  },

  serializeHasMany(snapshot, json, relationship) {
    if (relationship.options && relationship.options.readOnly)
      return;

    this._super(...arguments);
  },

  serializeBelongsTo(snapshot, json, relationship) {
    if (relationship.options && relationship.options.readOnly)
      return;

    this._super(...arguments);
  },
});
