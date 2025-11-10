import Model, { attr } from '@ember-data/model';
import { vosBelongsTo, vosHasMany } from '@vihai/ember-vos';

export default class YggMlAddressModel extends Model {
  @attr('string') addr;
  @attr('string') name;
  @attr('boolean') validated;
  @attr('boolean') reliable;
  @attr('number') reliability_score;

  @vosBelongsTo('ml_address', 'email') person_email;
  @vosHasMany('address', 'validation') validations;
}
