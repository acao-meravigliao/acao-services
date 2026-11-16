import { VosModel, attr, vosBelongsTo, vosHasMany } from '@vihai/ember-vos';

export default class YggAcaoAircraftOwnerModel extends VosModel {
  @attr('string') role;

  @vosBelongsTo('aircraft_owner', 'aircraft') aircraft;
  @vosBelongsTo('aircraft_owner', 'member') member;
}
