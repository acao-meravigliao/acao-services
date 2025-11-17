import { VosModel, attr, vosBelongsTo, vosHasMany } from '@vihai/ember-vos';

export default class YggAcaoRosterDayModel extends VosModel {
  @attr('date') date;
  @attr('boolean') high_season;
  @attr('number') needed_people;
  @attr('string') descr;

  @vosHasMany('day', 'entry') entries;
}
