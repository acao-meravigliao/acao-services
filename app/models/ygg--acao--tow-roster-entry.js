import { VosModel, attr, vosBelongsTo, vosHasMany } from '@vihai/ember-vos';

export default class YggAcaoTowRosterEntryModel extends VosModel {
  @attr('string') notes;
  @attr('date') selected_at;
}
