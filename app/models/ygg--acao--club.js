import Model, { attr } from '@ember-data/model';
import { vosBelongsTo, vosHasMany } from 'ember-vos';

export default class YggAcaoClubModel extends Model {
  @attr('string') name;
  @attr('number') airfield_id;

  airfield: DS.belongsTo('ygg--acao--airfield'),
}
