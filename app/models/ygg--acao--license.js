import { VosModel, attr, vosBelongsTo, vosHasMany } from '@vihai/ember-vos';

export default class YggAcaoLicenseModel extends VosModel {
  @attr('string') type;
  @attr('string') identifier;
  @attr('date') issued_at;
  @attr('date') valid_to;
  @attr('date') valid_to2;

  @vosBelongsTo('license', 'member') member;
}
