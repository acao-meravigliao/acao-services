import { VosModel, attr, vosBelongsTo, vosHasMany } from '@vihai/ember-vos';

export default class YggAcaoAircraftSyncStatusModel extends VosModel {
  @attr('string') symbol;
  @attr('string') status;
  @attr('date') last_update;
}
