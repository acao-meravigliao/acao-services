import { VosModel, attr, vosBelongsTo, vosHasMany } from '@vihai/ember-vos';

export default class YggAcaoFaiCardModel extends VosModel {
  @attr('string') identifier;
  @attr('date') issued_at;
  @attr('date') valid_to;
  @attr('string') country;

  @vosBelongsTo('fai_card', 'member') member;
}
