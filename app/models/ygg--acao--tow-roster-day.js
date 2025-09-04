import Model, { attr } from '@ember-data/model';
import { vosBelongsTo, vosHasMany } from '@vihai/ember-vos';

export default class YggAcaoTowRosterDayModel extends Model {
  @attr('date') date;
  @attr('number') needed_people;
  @attr('string') descr;
}
