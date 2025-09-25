import Model, { attr } from '@ember-data/model';
import { vosBelongsTo, vosHasMany } from '@vihai/ember-vos';

export default class YggAcaoOgnDdbEntryModel extends Model {
  @attr('string') device_type;
  @attr('string') device_id;
  @attr('string') aircraft_model_id;
  @attr('string') aircraft_registration;
  @attr('string') aircraft_model;
  @attr('string') aircraft_competition_id;
  @attr('boolean') tracked;
  @attr('boolean') identified;
  @attr('date') last_update;

  @vosBelongsTo('ogn_ddb_entry', 'aircraft') aircraft;
}
