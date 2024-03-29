import Model, { attr } from '@ember-data/model';
import { vosBelongsTo, vosHasMany } from '@sevio/ember-vos';

import { belongsTo, hasMany } from '@ember-data/model';

export default class YggAcaoServiceTypeModel extends Model {
  wsModelName = 'Ygg::Acao::ServiceType'

  @attr('string') symbol;
  @attr('string') name;
  @attr('string') descr;
  @attr('number') price;
  @attr('string') extra_info;
  @attr('string') notes;
  @attr('boolean') available_for_shop;
  @attr('boolean') available_for_membership_renewal;
}
