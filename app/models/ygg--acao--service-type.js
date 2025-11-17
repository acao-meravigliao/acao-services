import { VosModel, attr, vosBelongsTo, vosHasMany } from '@vihai/ember-vos';

export default class YggAcaoMemberServiceModel extends VosModel {
  @attr('string') symbol;
  @attr('string') name;
  @attr('number') price;
  @attr('number') vat;
  @attr('string') name;
  @attr('string') extra_info;
  @attr('string') descr;
  @attr('string') notes;
  @attr('string') onda_1_code;
  @attr('string') onda_1_type;
  @attr('string') onda_1_cnt;
  @attr('string') onda_2_code;
  @attr('string') onda_2_type;
  @attr('string') onda_2_cnt;
  @attr('boolean') is_association;
  @attr('boolean') is_cav;
  @attr('boolean') available_for_shop;
  @attr('boolean') available_for_membership_renewal;

  @vosHasMany('service_type', 'service') services;
}
