import Model, { attr } from '@ember-data/model';
import { vosBelongsTo, vosHasMany } from '@vihai/ember-vos';

export default class YggAcaoAircraftOwnerModel extends Model {
  @attr('boolean') is_referent;

  @vosBelongsTo('aircraft_owner', 'aircraft') aircraft;
  @vosBelongsTo('aircraft_owner', 'member') member;
}
