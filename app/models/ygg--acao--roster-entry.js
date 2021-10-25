import Model, { attr } from '@ember-data/model';
import { vosBelongsTo, vosHasMany } from 'ember-vos';

export default class YggAcaoRosterEntryModel extends Model {
  @attr('string') notes;
  @attr('date', { readOnly: true }) selected_at;
  @attr('date', { readOnly: true }) on_offer_since;

  person: DS.belongsTo('ygg--core--person', { readOnly: true }),
  roster_day: DS.belongsTo('ygg--acao--roster-day'),
}
