import Model, { attr } from '@ember-data/model';
import { vosBelongsTo, vosHasMany } from 'ember-vos';

import { belongsTo, hasMany } from '@ember-data/model';

export default class YggAcaoRosterEntryModel extends Model {
  @attr('string') notes;
  @attr('date', { readOnly: true }) selected_at;
  @attr('date', { readOnly: true }) on_offer_since;

  @belongsTo('ygg--core--person', { readOnly: true }) person;
  @belongsTo('ygg--acao--roster-day') roster_day;
}
