import { VosModel, attr, vosBelongsTo, vosHasMany } from '@vihai/ember-vos';

export default class YggAcaoClubModel extends VosModel {
  @attr('string') name;
  @attr('string') symbol;
  @attr('string') airfield_id;

  @vosBelongsTo('club', 'airfield') airfield;
  @vosHasMany('club', 'aircraft') aircrafts;
  @vosHasMany('club_owner', 'aircraft') aircrafts_as_owner;
}
