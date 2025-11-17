import { VosModel, attr, vosBelongsTo, vosHasMany } from '@vihai/ember-vos';

export default class YggAcaoYearModel extends VosModel {
  @attr('number') year;
  @attr('date') renew_opening_time;
  @attr('date') renew_announce_time;

  @vosHasMany('year', 'membership') memberships;
}
