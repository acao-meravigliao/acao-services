import Component from '@glimmer/component';
import { service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { TrackedObject } from 'tracked-built-ins';

import Papa from 'papaparse';
import moment from 'moment';

export default class FlightsTableComponent extends Component {
  @service router;
  @service session;
  @service store;
  @service download;
  @tracked details = false;
  @tracked flt_show = false;
  @tracked flt_all_classes = true;
  @tracked flt_all_roles = true;
  @tracked flt_reg;
  @tracked flt_launch;

  classes = [
    new TrackedObject({ symbol: 'gld', match: 'GLD', name: 'Aliante', enabled: true }),
    new TrackedObject({ symbol: 'tmg', match: 'TMG', name: 'TMG', enabled: true }),
    new TrackedObject({ symbol: 'sep', match: 'SEP', name: 'Aereo', enabled: true }),
    new TrackedObject({ symbol: 'ulm', match: 'ULM', name: 'ULM', enabled: true }),
  ]

  roles = [
    new TrackedObject({ symbol: 'pic', match: 'PIC', name: 'PIC', enabled: true }),
    new TrackedObject({ symbol: 'pax', match: 'PAX', name: 'PAX', enabled: true }),
    new TrackedObject({ symbol: 'dual', match: 'DUAL', name: 'DUAL', enabled: true }),
    new TrackedObject({ symbol: 'fi', match: 'FI', name: 'FI', enabled: true }),
    new TrackedObject({ symbol: 'fe', match: 'FE', name: 'FE', enabled: true }),
  ]

  my_role = (flight) => (flight.role(this.member));

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

  flight_class_matches(flt) {
    return this.flt_all_classes || this.classes.some((x) => (x.enabled && flt.aircraft_class === x.match ));
  }

  flight_role_matches(flt) {
    return this.flt_all_roles || this.roles.some((x) => (x.enabled && flt.role(this.member) === x.match ));
  }

  get filtered_models() {
    return this.args.flights.filter((x) => (
      this.flight_role_matches(x) &&
      this.flight_class_matches(x) &&
      (!this.flt_reg || x.aircraft_reg.toLowerCase().includes(this.flt_reg.toLowerCase())) &&
      (!this.flt_launch || x.launch_type === this.flt_launch)
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

  @action all_selected_change(ev) {
    this.args.flights.forEach((x) => (x.selected = ev.target.checked));
  }

  @action flight_selected_change(flight, ev) {
    flight.selected = ev.target.checked;
  }

  @action prevent_bubble(ev) {
    ev.stopPropagation();
  }

  @action details_change(ev) { this.details = ev.target.checked; }
  @action flt_show_change(ev) { this.flt_show = ev.target.checked; }

  // ------------------

  @action flt_all_classes_change(ev) {
    this.flt_all_classes = ev.target.checked;

    if (ev.target.checked) {
      this.classes.forEach((x) => (x.enabled = true));
    }
  }

  @action flt_class_change(cls, ev) {
    cls.enabled = ev.target.checked;

    if (!cls.enabled)
      this.flt_all_classes = false;
  }

  // ------------------

  @action flt_all_roles_change(ev) {
    this.flt_all_roles = ev.target.checked;

    if (ev.target.checked) {
      this.roles.forEach((x) => (x.enabled = true));
    }
  }

  @action flt_role_change(role, ev) {
    role.enabled = ev.target.checked;

    if (!role.enabled)
      this.flt_all_roles = false;
  }

  // ------------------

  @action flt_reg_change(ev) {
    this.flt_reg = ev.target.value;
  }

  //-----------
  get flt_launch_opts() {
    return [
     { symbol: null, name: '-' },
     { symbol: 'SL', name: 'Self-launch' },
     { symbol: 'TOW', name: 'Traino' },
     { symbol: 'WINCH', name: 'Verricello' },
    ];
  }

  get flt_launch_sel() {
    return this.flt_launch_opts.find((x) => (x.symbol === this.flt_launch));
  }

  @action flt_launch_change(ev) {
    this.flt_launch = ev.symbol;
  }

  get flt_aircraft_class_sel() {
    return this.flt_aircraft_class_opts.find((x) => (x.symbol === this.flt_aircraft_class));
  }

  @action flt_aircraft_class_change(ev) {
    this.flt_aircraft_class = ev.symbol;
  }

  //-----------
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
      x.aircraft_class,
      x.launch_type,
      moment(x.takeoff_time).format('YYYY-MM-DD, hh:mm:ss'),
      x.takeoff_location_raw,
      moment(x.landing_time).format('YYYY-MM-DD, hh:mm:ss'),
      x.landing_location_raw,
      x.pilot1_name,
      x.pilot1_role,
      x.pilot2_name,
      x.pilot2_role,
      this.format_duration(x.duration),
      x.acao_quota,
      x.acao_bollini_volo,
    ]));

    let csv = Papa.unparse({
      fields: [
        'aircraft_reg',
        'aircraft_class',
        'launch',
        'takeoff_time',
        'takeoff_location',
        'landing_time',
        'landing_location',
        'pilot1',
        'pilot1_role',
        'pilot2',
        'pilot2_role',
        'duration',
        'quota',
        'bollini',
      ],
      data: data,
    });

    this.download.asCSV('flight_log.csv', csv);
  }
}
