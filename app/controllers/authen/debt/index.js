import Controller from '@ember/controller';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class AuthenDebtIndexController extends Controller {
  @service session;
  @service router;

  @tracked flt_identifier;

  queryParams = [ 'sd', 'ed', ];

  @tracked sd;
  @tracked ed;
  @tracked flt_pending = true;
  @tracked flt_completed = true;

  presets = { };

  constructor() {
    super(...arguments);

    const date = new Date();
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);

    const sd_date = new Date(date);
    sd_date.setDate(sd_date.getDate() - 30);
    this.sd = sd_date.getTime();

    this.presets.d1 = { sd: new Date(date) };

    this.presets.d7 = { sd: new Date(date) };
    this.presets.d7.sd.setDate(date.getDate() - 7);

    this.presets.d30 = { sd: new Date(date) };
    this.presets.d30.sd.setDate(date.getDate() - 30);

    this.presets.d90 = { sd: new Date(date) };
    this.presets.d90.sd.setDate(date.getDate() - 90);
  }

  get preset() {
    const preset = Object.keys(this.presets).find((x) => (
      (!this.presets[x].sd || this.presets[x].sd.getTime() === this.sd) &&
      (!this.presets[x].ed || this.presets[x].ed.getTime() === this.ed)))

    return preset;
  }

  @action set_preset(val) {
    const preset = this.presets[val];

    const qp = {
      sd: preset.sd ? preset.sd.getTime() : null,
      ed: preset.ed ? preset.ed.getTime() : null,
    };

    this.router.transitionTo({ queryParams: qp });
  }

  get sd_date() {
    return this.sd ? new Date(parseInt(this.sd)) : null;
  }

  get sd_value() {
    return this.sd ? this.sd_date.toISOString().split('T')[0] : '';
  }
  get ed_date() {
    return this.ed ? new Date(parseInt(this.ed)) : null;
  }

  get ed_value() {
    return this.ed ? this.ed_date.toISOString().split('T')[0] : '';
  }

  get debts() {
    return this.model.get_cls('ygg--acao--debt');
  }

  get filtered_debts() {
    return this.debts.filter((x) => (
      (
        (this.flt_pending && x.state == 'PENDING') ||
        (this.flt_completed && x.state == 'COMPLETED')
      ) &&
      (!this.flt_identifier || x.identifier.toUpperCase().includes(this.flt_identifier.toUpperCase()))
    ));
  }

  get sorted_debts() {
    return this.filtered_debts.sort((a,b) => (b.created_at - a.created_at));
  }

  //-----------

  @action flt_identifier_on_input(ev) {
    this.flt_identifier = ev.target.value;
  }

  //-----------

  @action flt_sd_on_change(ev) {
    let val = ev.target.value ? new Date(ev.target.value).getTime() : null;
    this.router.transitionTo({ queryParams: { sd: val, ed: this.ed }});
  }

  @action flt_sd_on_keypress(ev) {
    ev.preventDefault();
  }

  @action flt_ed_on_change(ev) {
    let val = ev.target.value ? new Date(ev.target.value).getTime() : null;
    this.router.transitionTo({ queryParams: { sd: this.sd, ed: val }});
  }

  @action flt_ed_on_keypress(ev) {
    ev.preventDefault();
  }

  @action set_sd(val) {
    this.router.transitionTo({ queryParams: { sd: val.toString() }});
  }

  //-----------

  @action flt_pending_on_change(ev) {
    this.flt_pending = ev.target.changed;
  }

  @action flt_completed_on_change(ev) {
    this.flt_completed = ev.target.changed;
  }

}
