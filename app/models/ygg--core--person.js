import DS from 'ember-data';
import { computed } from '@ember/object';

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
  preferred_language_id: DS.attr('number'),

  acao_ext_id: DS.attr('number'),
  acao_code: DS.attr('number'),

  acao_bar_credit: DS.attr('number'),
  acao_bollini: DS.attr('number'),
  acao_is_student: DS.attr('boolean'),
  acao_is_tug_pilot: DS.attr('boolean'),
  acao_is_board_member: DS.attr('boolean'),
  acao_is_instructor: DS.attr('boolean'),
  acao_is_fireman: DS.attr('boolean'),
  acao_roster_allowed: DS.attr('boolean'),
  acao_roster_chief: DS.attr('boolean'),

  contacts: DS.hasMany('ygg--core--person--contact'),

  full_name: computed('first_name', 'last_name', function() { return this.first_name + ' ' + this.last_name; }),
});
