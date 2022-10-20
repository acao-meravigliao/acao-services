import Model, { attr } from '@ember-data/model';
import { vosBelongsTo, vosHasMany } from '@sevio/ember-vos';

import { belongsTo, hasMany } from '@ember-data/model';

export default class YggAcaoMembershipModel extends Model {
  @attr('string') person_id;
  @attr('boolean') email_allowed;
  @attr('boolean') tug_pilot;
  @attr('boolean') board_member;
  @attr('boolean') instructor;
  @attr('boolean') possible_roster_chief;
  @attr('boolean') fireman;
  @attr('date') valid_from;
  @attr('date') valid_to;
  @attr('string') reference_year_id;
  @attr('string') invoice_detail_id;
  @attr('string') status;

  @belongsTo('ygg--acao--year', { async: true }) reference_year;
  @belongsTo('ygg--acao--invoice--detail', { async: true }) invoice_detail;
  @belongsTo('ygg--core--person', { async: true }) person;
}
