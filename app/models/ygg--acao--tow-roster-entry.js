import Model, { attr } from '@ember-data/model';
import { vosBelongsTo, vosHasMany } from 'ember-vos';

import { belongsTo, hasMany } from '@ember-data/model';

export default class YggAcaoTowRosterEntryModel extends Model {
  @attr('string') notes;
  @attr('date') selected_at;

  @belongsTo('ygg--core--person') person;
  @belongsTo('ygg--acao--tow-roster-day') day;
}
