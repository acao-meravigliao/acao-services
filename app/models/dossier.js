import DS from 'ember-data';

export default DS.Model.extend({
  if_index: DS.attr('number'),
  hostname: DS.attr('string'),
  netbios_name: DS.attr('string'),
  mac_addresses: DS.attr(),
  ipv4_addresses: DS.attr(),
  ipv6_addresses: DS.attr(),
  last_activity: DS.attr('date'),
});
