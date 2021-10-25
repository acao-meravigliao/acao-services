import Model, { attr } from '@ember-data/model';
import { vosBelongsTo, vosHasMany } from 'ember-vos';

export default class YggAcaoMembershipModel extends Model {
  @attr('number') person_id;
  @attr('boolean') email_allowed;
  @attr('boolean') tug_pilot;
  @attr('boolean') board_member;
  @attr('boolean') instructor;
  @attr('boolean') possible_roster_chief;
  @attr('boolean') fireman;
  @attr('date') valid_from;
  @attr('date') valid_to;
  @attr('number') reference_year_id;
  @attr('string') invoice_detail_id;
  @attr('string') status;

  reference_year: DS.belongsTo('ygg--acao--year'),
  invoice_detail: DS.belongsTo('ygg--acao--invoice--detail'),
  person: DS.belongsTo('ygg--core--person'),
}
