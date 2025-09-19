import Component from '@glimmer/component';
import { service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import Papa from 'papaparse';
import moment from 'moment';

export default class FlightsTableComponent extends Component {
  @service router;
  @service session;
  @service store;
  @service download;
  @tracked flt_pic = true;
  @tracked flt_pax = true;
  @tracked flt_dual = true;
  @tracked flt_reg;
  @tracked flt_gl = true;
  @tracked flt_ga = true;

  get_role = (flight) => (flight.role(this.member));

  get member() {
    return this.args.member;
  }

  get sd_date() {
    return this.args.sd ? new Date(parseInt(this.args.sd)) : null;
  }

  get sd_value() {
    return this.args.sd ? this.sd_date.toISOString().split('T')[0] : '';
  }

  get ed_date() {
    return this.args.ed ? new Date(parseInt(this.args.ed)) : null;
  }

  get ed_value() {
    return this.args.ed ? this.ed_date.toISOString().split('T')[0] : '';
  }

  get filtered_models() {
    return this.args.flights.filter((x) => (
      ((this.flt_pic && (x.role(this.member) === 'PIC')) ||
       (this.flt_pax && (x.role(this.member) === 'PAX')) ||
       (this.flt_dual && (x.role(this.member) === 'DUAL')) ||
       (this.flt_gl && (x.source_expansion === 'GL')) ||
       (this.flt_ga && (x.source_expansion === 'TOW'))
      ) &&
      (!this.flt_reg || x.aircraft_reg.toLowerCase().includes(this.flt_reg.toLowerCase()))
    ));
  }

  get sorted_models() {
    return this.filtered_models.sort((a,b) => (b.takeoff_time - a.takeoff_time));
  }

  get total_count() {
    return this.filtered_models.reduce((a,x) => (a + (x.selected ? 1 : 0)), 0);
  }

  get total_duration() {
    return this.filtered_models.reduce((a,x) => (a + (x.selected ? x.duration : 0)), 0);
  }

  get total_bollini() {
    return this.filtered_models.reduce((a,x) => (a + (x.selected ? x.acao_bollini_volo : 0)), 0);
  }

  get all_selected() {
    return this.args.flights.every((x) => (x.selected));
  }

  @action all_selected_toggle(ev) {
    this.args.flights.forEach((x) => (x.selected = ev.target.checked));
  }

  @action flight_selected_toggle(flight, ev) {
    flight.selected = ev.target.checked;
  }

  @action flt_pic_toggle() { this.flt_pic = !this.flt_pic; }
  @action flt_pax_toggle() { this.flt_pax = !this.flt_pax; }
  @action flt_dual_toggle() { this.flt_dual = !this.flt_dual; }
  @action flt_gl_toggle() { this.flt_gl = !this.flt_gl; }
  @action flt_ga_toggle() { this.flt_ga = !this.flt_ga; }

  @action prevent_bubble(ev) {
    ev.stopPropagation();
  }

  @action flt_reg_change(ev) {
    this.flt_reg = ev.target.value;
  }

  @action flt_sd_on_change(ev) {
    let val = ev.target.value ? new Date(ev.target.value).getTime() : null;
    this.router.transitionTo({ queryParams: { sd: val, ed: this.ed }});
  }

  @action flt_ed_on_change(ev) {
    let val = ev.target.value ? new Date(ev.target.value).getTime() : null;
    this.router.transitionTo({ queryParams: { sd: this.args.sd, ed: val }});
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

  @action goto_flight_new() {
    this.router.transitionTo('authen.flight.new');
  }

  format_duration(dur, secs) {
    if (!dur)
      return '';

    let hh = Math.floor(dur / 3600000).toFixed().padStart(2, '0');
    let mm = Math.floor((dur % 3600000) / 60000).toFixed().padStart(2, '0');
    let ss = Math.floor((dur % 60000) / 1000).toFixed().padStart(2, '0');

    return `${hh}:${mm}` + (secs ? `:${ss}` : '');
  }

  @action download_as_csv() {
    let data = this.sorted_models.map((x) => ([
      x.aircraft_reg,
      moment(x.takeoff_time).format('YYYY-MM-DD, hh:mm:ss'),
      x.takeoff_location_raw,
      moment(x.landing_time).format('YYYY-MM-DD, hh:mm:ss'),
      x.landing_location_raw,
      x.pilot1_name,
      x.pilot2_name,
      this.format_duration(x.duration),
      x.acao_quota,
      x.acao_bollini_volo,
    ]));

    let csv = Papa.unparse({
      fields: [
        'aircraft_reg',
        'takeoff_time',
        'takeoff_location',
        'landing_time',
        'landing_location',
        'pilot1',
        'pilot2',
        'duration',
        'quota',
        'bollini_volo',
      ],
      data: data,
    });

    this.download.asCSV('flight_log.csv', csv);
  }
}
