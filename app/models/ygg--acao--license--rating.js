import { VosModel, attr, vosBelongsTo, vosHasMany } from '@vihai/ember-vos';

export default class YggAcaoLicenseRatingModel extends VosModel {
  @attr('string') type;
  @attr('date') issued_at;
  @attr('date') valid_to;

  @vosBelongsTo('rating', 'license') license;
}
