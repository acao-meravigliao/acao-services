import Controller from '@ember/controller';
import { service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class FlightsController extends Controller {
  @service router;
  @service session;
  @service store;
  @tracked flt_pic = true;
  @tracked flt_pax = true;
  @tracked range_selected;
  @tracked range_center;

  queryParams = [ 'sd', 'ed', ];

  ed = null;

  constructor() {
    super(...arguments);

    this.sd = new Date();
    this.sd.setDate(this.sd.getDate() - 30);

    this.range_selected = { start: this.sd, end: this.ed };
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

  get filtered_models() {
    let person = this.store.peekRecord('ygg--core--person', this.session.person_id);

    return this.model.filter((x) => (
      (this.flt_pic && (x.role(person.member) === 'PIC')) ||
      (this.flt_pax && (x.role(person.member) === 'PAX'))
    ));
  }

  get sorted_models() {
    return this.filtered_models.sort((a,b) => (b.takeoff_time - a.takeoff_time));
  }

  @action flt_pic_toggle() {
    this.flt_pic = !this.flt_pic;
  }

  @action flt_pax_toggle() {
    this.flt_pax = !this.flt_pax;
  }

  @action flt_sd_on_change(ev) {
    let val = ev.target.value ? new Date(ev.target.value).getTime() : null;
    this.router.transitionTo({ queryParams: { sd: val, ed: this.ed }});
  }

  @action flt_ed_on_change(ev) {
    let val = ev.target.value ? new Date(ev.target.value).getTime() : null;
    this.router.transitionTo({ queryParams: { sd: this.sd, ed: val }});
  }


  @action set_sd(val) {
    this.router.transitionTo({ queryParams: { sd: val.toString() }});
  }

  @action on_sd_select(val) {
    this.sd_selected = val.date;
  }

  @action on_sd_center_change(val) {
    this.sd_center = val.date;
  }

  @action goto_flight(id) {
    this.router.transitionTo('authen.flight', id);
  }
}
