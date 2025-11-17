import { VosModel, attr, vosBelongsTo, vosHasMany } from '@vihai/ember-vos';

export default class CartEntryModel extends VosModel {
  @attr('number') count;
}
