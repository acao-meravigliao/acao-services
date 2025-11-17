import { VosModel, attr, vosBelongsTo, vosHasMany } from '@vihai/ember-vos';

export default class YggAcaoAircraftTypeModel extends VosModel {
  @attr('string') manufacturer;
  @attr('string') name;
  @attr('number') seats;
  @attr('number') motor;
  @attr('string') link_wp;
  @attr('number') handicap;
  @attr('number') club_handicap;
  @attr('string') aircraft_class;
}
