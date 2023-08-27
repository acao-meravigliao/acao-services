import Model, { attr } from '@ember-data/model';
import { vosBelongsTo, vosHasMany } from '@vihai/ember-vos';

import { belongsTo, hasMany } from '@ember-data/model';

export default class YggAcaoRosterDayModel extends Model {
  @attr('date') date;
  @attr('boolean') high_season;
  @attr('number') needed_people;
  @attr('string') descr;

  @hasMany('ygg--acao--roster-entry', { async: true }) roster_entries;
}
