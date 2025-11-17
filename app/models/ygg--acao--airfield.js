import { VosModel, attr, vosBelongsTo, vosHasMany } from '@vihai/ember-vos';

export default class YggAcaoAirfieldModel extends VosModel {
  @attr('string') name;
  @attr('string') icao_code;
  @attr('string') symbol;

  @vosBelongsTo('airfield', 'location') location;
}
