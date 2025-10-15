import Model, { attr } from '@ember-data/model';
import { vosBelongsTo, vosHasMany } from '@vihai/ember-vos';

export default class YggAcaoMemberModel extends Model {
  @attr('date') created_at;
  @attr('date') updated_at;

  @attr('number') ext_id;
  @attr('number') code;

  @attr('number') bar_credit;
  @attr('number') bollini;
  @attr('boolean') roster_allowed;
  @attr('boolean') roster_chief;

  @vosBelongsTo('acao_member', 'person') person;
  @vosHasMany('member', 'role') roles;
  @vosHasMany('member', 'roster_entry') roster_entries;
  @vosHasMany('member', 'bar_transaction') bar_transactions;
  @vosHasMany('member', 'token_transaction') token_transactions;
  @vosHasMany('member', 'aircraft_owner') aircrafts_as_owner;
  @vosHasMany('member', 'debt') debts;

  has_role(role) {
    return this.roles.some((x) => (x.symbol === role));
  }
}
