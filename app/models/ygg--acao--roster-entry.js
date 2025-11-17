import { VosModel, attr, vosBelongsTo, vosHasMany } from '@vihai/ember-vos';

export default class YggAcaoRosterEntryModel extends VosModel {
  @attr('string') notes;
  @attr('date', { readOnly: true }) selected_at;
  @attr('date', { readOnly: true }) on_offer_since;

  @vosBelongsTo('roster_entry', 'member') member;
  @vosBelongsTo('entry', 'day') roster_day;
}
