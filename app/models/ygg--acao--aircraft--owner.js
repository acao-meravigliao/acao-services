import { VosModel, attr, vosBelongsTo, vosHasMany } from '@vihai/ember-vos';

export default class YggAcaoAircraftOwnerModel extends VosModel {
  @attr('boolean') is_referent;

  @vosBelongsTo('aircraft_owner', 'aircraft') aircraft;
  @vosBelongsTo('aircraft_owner', 'member') member;
}
