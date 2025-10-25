import Component from '@glimmer/component';
import { service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { TrackedObject } from 'tracked-built-ins';
import moment from 'moment';
import * as XLSX from 'xlsx';

export default class FlightsTableComponent extends Component {
  @service router;
  @service session;
  @service store;
  @service download;
  @tracked details = false;
  @tracked sd;
  @tracked ed;
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

  is_aircraft_mine = (ac) => (ac.is_owned_by(this.member));

  constructor() {
    super(...arguments);

    let date = new Date();
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);

    this.d30 = new Date(date);
    this.d30.setDate(date.getDate() - 30);

    this.d90 = new Date(date);
    this.d90.setDate(date.getDate() - 90);

    this.d365 = new Date(date);
    this.d365.setDate(date.getDate() - 365);

    this.dy = new Date(date);
    this.dy.setDate(1);
    this.dy.setMonth(0);

    // if (matchMedia('handheld').matches)

    if (screen.width >= 1320)
      this.details = true;
  }

  get member() {
    return this.args.member;
  }

  get sd_date() {
    return this.args.sd ? new Date(parseInt(this.args.sd)) : null;
  }

  get sd_value() {
    return this.args.sd ? this.sd_date.toISOString().split('T')[0] : '';
  }

  get preset() {
    if (this.args.sd === this.d30.getTime())
      return 'd30';
    else if (this.args.sd === this.d90.getTime())
      return 'd90';
    else if (this.args.sd === this.d365.getTime())
      return 'd365';
    else if (this.args.sd === this.dy.getTime())
      return 'dy';
    else
      return null;
  }

  @action set_preset(val) {
    switch(val) {
    case 'd30': this.set_sd(this.d30.getTime()); break;
    case 'd90': this.set_sd(this.d90.getTime()); break;
    case 'd365': this.set_sd(this.d365.getTime()); break;
    case 'dy': this.set_sd(this.dy.getTime()); break;
    }
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

  @action details_toggle(ev) { this.details = !this.details; }
  @action flt_show_toggle(ev) { this.flt_show = !this.flt_show; }

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

  @action flt_sd_on_keypress(ev) {
    ev.preventDefault();
  }

  @action flt_ed_on_change(ev) {
    let val = ev.target.value ? new Date(ev.target.value).getTime() : null;
    this.router.transitionTo({ queryParams: { sd: this.args.sd, ed: val }});
  }

  @action flt_ed_on_keypress(ev) {
    ev.preventDefault();
  }


  @action set_sd(val) {
    this.router.transitionTo({ queryParams: { sd: val.toString() }});
  }

  format_duration(dur, secs) {
    if (!dur)
      return '';

    let hh = Math.floor(dur / 3600000).toFixed().padStart(2, '0');
    let mm = Math.floor((dur % 3600000) / 60000).toFixed().padStart(2, '0');
    let ss = Math.floor((dur % 60000) / 1000).toFixed().padStart(2, '0');

    return `${hh}:${mm}` + (secs ? `:${ss}` : '');
  }

  data_for_export() {
    let data = this.sorted_models.map((x) => ({
      'aircraft_reg':        x.aircraft_reg,
      'aircraft_class':      x.aircraft_class,
      'launch':              x.launch_type,
      'date':                moment(x.takeoff_time).format('YYYY-MM-DD'),
      'takeoff_time':        x.takeoff_time,
      'takeoff_time_of_day': moment(x.takeoff_time).format('hh:mm:ss'),
      'takeoff_location':    x.takeoff_location_raw,
      'landing_time':        x.landing_time,
      'landing_time_of_day': moment(x.landing_time).format('hh:mm:ss'),
      'landing_location':    x.landing_location_raw,
      'pilot1':              x.pilot1_name,
      'pilot1_role':         x.pilot1_role,
      'pilot2':              x.pilot2_name,
      'pilot2_role':         x.pilot2_role,
      'duration':            this.format_duration(x.duration),
      'quota':               x.acao_quota,
      'bollini':             x.acao_bollini_volo,
    }));

    return data;
  }

  build_worksheet() {
    const ws = XLSX.utils.json_to_sheet(this.data_for_export(), { cellDates: true, dateNF: 'yyyy-mm-dd HH:MM:ss' });

    return ws;
  }

  build_workbook() {
    const worksheet = this.build_worksheet();
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Stralcio");

    return workbook;
  }

  @action download_as_csv() {
    //let output = XLSX.write(this.build_workbook(), { bookType: 'csv', type: 'array' });
    //this.download.as_type('flight_log.csv', 'text/csv', output);

    const output = XLSX.utils.sheet_to_csv(this.build_worksheet())
    this.download.as_type('flight_log.csv', 'text/csv', output);
  }

  @action download_as_json() {
    const output = JSON.stringify(XLSX.utils.sheet_to_json(this.build_worksheet()));
    this.download.as_type('flight_log.json', 'application/json', output);
  }

  @action download_as_xlsx() {
    const output = XLSX.write(this.build_workbook(), { bookType: 'xlsx', type: 'array' });
    this.download.as_type('flight_log.xlsx', 'application/vnd.ms-excel', output);
  }

  @action download_as_ods() {
    const output = XLSX.write(this.build_workbook(), { bookType: 'ods', type: 'array' });
    this.download.as_type('flight_log.ods', 'application/vnd.oasis.opendocument.spreadsheet', aaa);
  }
}
