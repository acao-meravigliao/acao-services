import Model, { attr } from '@ember-data/model';
import { vosBelongsTo, vosHasMany } from 'ember-vos';

export default class CartEntryModel extends Model {
  @attr('number') count;

  service: DS.belongsTo('ygg--acao--service-type'),
}
