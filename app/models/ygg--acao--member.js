import Model, { attr } from '@ember-data/model';
import { vosBelongsTo, vosHasMany } from '@vihai/ember-vos';

export default class YggAcaoMemberModel extends Model {
  @attr('date') created_at;
  @attr('date') updated_at;

  @attr('number') ext_id;
  @attr('number') code;

  @attr('number') bar_credit;
  @attr('number') bollini;
  @attr('boolean') is_student;
  @attr('boolean') is_tug_pilot;
  @attr('boolean') is_board_member;
  @attr('boolean') is_instructor;
  @attr('boolean') is_fireman;
  @attr('boolean') roster_allowed;
  @attr('boolean') roster_chief;

  @vosBelongsTo('acao_member', 'person') person;
  @vosHasMany('member', 'roster_entry') roster_entries;
  @vosHasMany('member', 'bar_transaction') bar_transactions;
  @vosHasMany('member', 'token_transaction') token_transactions;
  @vosHasMany('member', 'aircraft_owner') aircrafts_as_owner;
}
