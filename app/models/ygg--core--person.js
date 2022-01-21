import Model, { attr } from '@ember-data/model';
import { vosBelongsTo, vosHasMany } from '@sevio/ember-vos';

import { belongsTo, hasMany } from '@ember-data/model';

export default class YggCorePersonModel extends Model {
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

  @attr('number') acao_ext_id;
  @attr('number') acao_code;

  @attr('number') acao_bar_credit;
  @attr('number') acao_bollini;
  @attr('boolean') acao_is_student;
  @attr('boolean') acao_is_tug_pilot;
  @attr('boolean') acao_is_board_member;
  @attr('boolean') acao_is_instructor;
  @attr('boolean') acao_is_fireman;
  @attr('boolean') acao_roster_allowed;
  @attr('boolean') acao_roster_chief;

  @hasMany('ygg--core--person--contact') contacts;

  get full_name() {
    return this.first_name + ' ' + this.last_name;
  }
}
