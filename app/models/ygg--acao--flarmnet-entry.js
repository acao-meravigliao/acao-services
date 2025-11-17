import { VosModel, attr, vosBelongsTo, vosHasMany } from '@vihai/ember-vos';

export default class YggAcaoFlarmentEntryModel extends VosModel {
  @attr('string') device_type;
  @attr('string') device_id;
  @attr('string') aircraft_model;
  @attr('string') registration;
  @attr('string') cn;
  @attr('boolean') tracked;
  @attr('boolean') identified;
  @attr('date') last_update;

}
