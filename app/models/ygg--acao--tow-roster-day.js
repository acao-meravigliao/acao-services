import Model, { attr } from '@ember-data/model';
import { vosBelongsTo, vosHasMany } from 'ember-vos';

export default class YggAcaoTowRosterDayModel extends Model {
  @attr('date') date;
  @attr('number') needed_people;
  @attr('string') descr;

  roster_entries: DS.hasMany('ygg--acao--tow-roster-entry'),
}
