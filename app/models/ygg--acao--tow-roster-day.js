import { VosModel, attr, vosBelongsTo, vosHasMany } from '@vihai/ember-vos';

export default class YggAcaoTowRosterDayModel extends VosModel {
  @attr('date') date;
  @attr('number') needed_people;
  @attr('string') descr;
}
