import Model, { attr } from '@ember-data/model';
import { vosBelongsTo, vosHasMany } from '@sevio/ember-vos';

import { belongsTo, hasMany } from '@ember-data/model';

export default class YggAcaoTowRosterDayModel extends Model {
  @attr('date') date;
  @attr('number') needed_people;
  @attr('string') descr;

  @belongsTo('ygg--acao--tow-roster-entry', { async: true }) roster_entries;
}
