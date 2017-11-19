import DS from 'ember-data';

export default DS.Model.extend({
  uuid: DS.attr('string'),
  created_at: DS.attr('date'),
  updated_at: DS.attr('date'),
  first_name: DS.attr('string'),
  middle_name: DS.attr('string'),
  last_name: DS.attr('string'),
  title: DS.attr('string'),
  nickname: DS.attr('string'),
  gender: DS.attr('string'),
  birth_date: DS.attr('date'),
  vat_number: DS.attr('string'),
  italian_fiscal_code: DS.attr('string'),
  handle: DS.attr('string'),
  acao_ext_id: DS.attr('number'),
  acao_code: DS.attr('number'),
  preferred_language_id: DS.attr('number'),

  contacts: DS.hasMany('ygg--core--person--contact'),
});
