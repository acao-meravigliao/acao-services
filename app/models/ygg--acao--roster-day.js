import Model, { attr } from '@ember-data/model';
import { vosBelongsTo, vosHasMany } from '@vihai/ember-vos';

export default class YggAcaoRosterDayModel extends Model {
  @attr('date') date;
  @attr('boolean') high_season;
  @attr('number') needed_people;
  @attr('string') descr;

  @vosHasMany('day', 'entry') roster_entries;
}
