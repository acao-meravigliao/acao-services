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
});
