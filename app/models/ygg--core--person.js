import { VosModel, attr, vosBelongsTo, vosHasMany } from '@vihai/ember-vos';

export default class YggCorePersonModel extends VosModel {
  @attr('date') created_at;
  @attr('date') updated_at;
  @attr('string') first_name;
  @attr('string') middle_name;
  @attr('string') last_name;
  @attr('string') title;
  @attr('string') nickname;
  @attr('string') gender;
  @attr('date') birth_date;
  @attr('string') vat_number;
  @attr('string') italian_fiscal_code;
  @attr('string') handle;
  @attr('string') preferred_language_id;

  @vosBelongsTo('person', 'acao_member') member;
  @vosHasMany('person', 'email') emails;
  @vosHasMany('person', 'contact') contacts;
  @vosBelongsTo('person', 'birth_location') birth_location;
  @vosBelongsTo('person', 'residence_location') residence_location;


  get full_name() {
    return this.first_name + ' ' + this.last_name;
  }
}
