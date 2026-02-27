import { VosModel, attr, vosBelongsTo, vosHasMany } from '@vihai/ember-vos';

export default class YggAcaoMemberModel extends VosModel {
  @attr('date') created_at;
  @attr('date') updated_at;

  @attr('number') ext_id;
  @attr('number') code;

  @attr('number') bar_credit;
  @attr('number') bollini;
  @attr('boolean') roster_allowed;
  @attr('boolean') roster_chief;

  @attr('boolean') email_allowed;
  @attr('date') email_allowed_at;
  @attr('boolean') privacy_accepted;
  @attr('date') privacy_accepted_at;

  @attr('boolean', { allowNull: true }) consent_association;
  @attr('boolean', { allowNull: true }) consent_surveillance;
  @attr('boolean', { allowNull: true }) consent_accessory;
  @attr('boolean', { allowNull: true }) consent_profiling;
  @attr('boolean', { allowNull: true }) consent_magazine;
  @attr('boolean', { allowNull: true }) consent_fai;
  @attr('boolean', { allowNull: true }) consent_marketing;
  @attr('boolean', { allowNull: true }) consent_members;

  @attr('boolean') wind_rating;
  @attr('boolean') wind_lim;
  @attr('date') wind_lim_to;
  @attr('string') wind_lim_reason;
  @attr('boolean') solo_rating;
  @attr('boolean') solo_lim;
  @attr('date') solo_lim_to;
  @attr('string') solo_lim_reason;
  @attr('boolean') astir_rating;
  @attr('boolean') astir_lim;
  @attr('date') astir_lim_to;
  @attr('string') astir_lim_reason;
  @attr('boolean') discus_rating;
  @attr('boolean') discus_lim;
  @attr('date') discus_lim_to;
  @attr('string') discus_lim_reason;
  @attr('boolean') duodiscus_rating;
  @attr('boolean') duodiscus_lim;
  @attr('date') duodiscus_lim_to;
  @attr('string') duodiscus_lim_reason;
  @attr('boolean') pax_lim;
  @attr('date') pax_lim_to;
  @attr('string') pax_lim_reason;

  @vosBelongsTo('acao_member', 'person') person;
  @vosHasMany('member', 'membership') memberships;
  @vosHasMany('member', 'role') roles;
  @vosHasMany('member', 'medical') medicals;
  @vosHasMany('member', 'license') licenses;
  @vosHasMany('member', 'aircraft_owner') aircrafts_as_owner;
  @vosHasMany('member', 'roster_entry') roster_entries;
  @vosHasMany('member', 'bar_transaction') bar_transactions;
  @vosHasMany('member', 'token_transaction') token_transactions;
  @vosHasMany('member', 'debt') debts;
  @vosHasMany('member', 'payment') payments;
  @vosHasMany('member', 'invoice') invoices;
  @vosHasMany('member', 'pm_note') pm_notes;

  has_role(role) {
    return this.roles.some((x) => (x.symbol === role));
  }
}
