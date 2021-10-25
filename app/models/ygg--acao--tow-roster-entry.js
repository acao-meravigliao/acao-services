import Model, { attr } from '@ember-data/model';
import { vosBelongsTo, vosHasMany } from 'ember-vos';

export default class YggAcaoTowRosterEntryModel extends Model {
  @attr('string') notes;
  @attr('date') selected_at;

  person: DS.belongsTo('ygg--core--person'),
  day: DS.belongsTo('ygg--acao--tow-roster-day'),
}
