import DS from 'ember-data';

export default DS.Model.extend({
  uuid: DS.attr('string'),
  date: DS.attr('date'),
  high_season: DS.attr('boolean'),
  needed_people: DS.attr('number'),
  descr: DS.attr('string'),
  roster_entries: DS.hasMany('ygg--acao--roster-entry'),
});
