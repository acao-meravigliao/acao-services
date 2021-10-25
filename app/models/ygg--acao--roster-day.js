import Model, { attr } from '@ember-data/model';
import { vosBelongsTo, vosHasMany } from 'ember-vos';

export default class YggAcaoRosterDayModel extends Model {
  @attr('date') date;
  @attr('boolean') high_season;
  @attr('number') needed_people;
  @attr('string') descr;

  roster_entries: DS.hasMany('ygg--acao--roster-entry'),
}
