import Component from '@glimmer/component';
import { service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { TrackedObject } from 'tracked-built-ins';
import { later } from '@ember/runloop';
import moment from 'moment';
import * as XLSX from 'xlsx';

export default class FlightsTableComponent extends Component {
  @service router;
  @service session;
  @service store;
  @service download;
  @tracked details = false;

  classes = [
    new TrackedObject({ symbol: 'GLD', name: 'Aliante', enabled: true }),
    new TrackedObject({ symbol: 'TMG', name: 'TMG', enabled: true }),
    new TrackedObject({ symbol: 'SEP', name: 'Aereo', enabled: true }),
    new TrackedObject({ symbol: 'ULM', name: 'ULM', enabled: true }),
  ];

  roles = [
    new TrackedObject({ symbol: 'PIC', name: 'PIC', enabled: true }),
    new TrackedObject({ symbol: 'PICUS', name: 'PICUS', enabled: true }),
    new TrackedObject({ symbol: 'PAX', name: 'PAX', enabled: true }),
    new TrackedObject({ symbol: 'DUAL', name: 'DUAL', enabled: true }),
    new TrackedObject({ symbol: 'FI', name: 'FI', enabled: true }),
    new TrackedObject({ symbol: 'FI_PIC', name: 'FI_PIC', enabled: true }),
    new TrackedObject({ symbol: 'FE', name: 'FE', enabled: true }),
  ];

  launches = [
    new TrackedObject({ symbol: 'TOW', name: 'Traino', enabled: true }),
    new TrackedObject({ symbol: 'SL', name: 'Self-launch', enabled: false }),
    new TrackedObject({ symbol: 'WINCH', name: 'Verricello', enabled: false }),
  ];

  is_aircraft_mine = (ac) => (ac.is_owned_by(this.args.user_member));

  constructor() {
    super(...arguments);

    let date = new Date();
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);

    this.presets = {};
    this.presets['d1'] = { sd: new Date(date) };

    this.presets['dy'] = { };
    this.presets['dy'].sd = new Date(date);
    this.presets['dy'].sd.setDate(date.getDate() - 2);
    this.presets['dy'].ed = new Date(date);
    this.presets['dy'].ed.setDate(date.getDate() - 1);

    this.presets['d2'] = {};
    this.presets['d2'].sd = new Date(date);
    this.presets['d2'].sd.setDate(date.getDate() - 2);

    this.presets['d7'] = {};
    this.presets['d7'].sd = new Date(date);
    this.presets['d7'].sd.setDate(date.getDate() - 7);

    this.presets['week'] = {};
    const yesterday = new Date(date);
    yesterday.setDate(yesterday.getDate() - 1);

    this.presets['week'].sd = new Date(date);
    this.presets['week'].sd.setDate(date.getDate() - yesterday.getDay());

    this.presets['month'] = {};
    this.presets['month'].sd = new Date(date);
    this.presets['month'].sd.setDate(date.getDate() - 31);

    this.presets['d90'] = {};
    this.presets['d90'].sd = new Date(date);
    this.presets['d90'].sd.setDate(date.getDate() - 90);

    this.presets['m24'] = {};
    this.presets['m24'].sd = new Date(date);
    this.presets['m24'].sd.setMonth(date.getMonth() - 24);

    // if (matchMedia('handheld').matches)

    if (this.args.preset) {
      later(() => {
        this.set_preset(this.args.preset);
       });
    }

    if (this.args.flt_classes) {
      const classes = this.args.flt_classes.split(',');
      if (this.classes.some((x) => (classes.includes(x.symbol)))) {
        this.flt_all_classes = false;
        this.classes.forEach((x) => (x.enabled = (classes.includes(x.symbol))));
      }
    }

    if (this.args.flt_roles) {
      const roles = this.args.flt_roles.split(',');
      if (this.roles.some((x) => (roles.includes(x.symbol)))) {
        this.flt_all_roles = false;
        this.roles.forEach((x) => (x.enabled = (roles.includes(x.symbol))));
      }
    }

    if (this.args.flt_launches) {
      const launches = this.args.flt_launches.split(',');
      if (this.launches.some((x) => (launches.includes(launch.symbol)))) {
        this.flt_all_launches = false;
        this.launches.forEach((x) => (x.enabled = (launches.includes(x.symbol))));
      }
    }

    if (screen.width >= 1320)
      this.details = true;
  }

  get preset() {
    const preset = Object.keys(this.presets).find((x) => (
      (!this.presets[x].sd || this.presets[x].sd.getTime() === this.args.sd) &&
      (!this.presets[x].ed || this.presets[x].ed.getTime() === this.args.ed)))

    return preset;
  }

  @action set_preset(val) {
    const preset = this.presets[val];

    const qp = {
      preset: null,
      sd: preset.sd ? preset.sd.getTime() : null,
      ed: preset.ed ? preset.ed.getTime() : null,
    };

    this.router.transitionTo({ queryParams: qp });
  }

  toDS(d) {
    if (!d)
      return null;

    d = new Date(d);

    return d.getFullYear().toString().padStart(4, '0') + '-' +
           (d.getMonth()+1).toString().padStart(2, '0') + '-' +
           d.getDate().toString().padStart(2, '0');
  }

  get sd_date() {
    return this.args.sd ? new Date(parseInt(this.args.sd)) : null;
  }

  get sd_value() {
    return this.toDS(this.args.sd);
  }

  get ed_date() {
    return this.args.ed ? new Date(parseInt(this.args.ed)) : null;
  }

  get ed_value() {
    return this.toDS(this.args.ed);
  }

  flight_class_matches(flt) {
    return this.flt_all_classes || this.classes.some((x) => (x.enabled && flt.aircraft_class === x.symbol ));
  }

  flight_role_matches(flt) {
    const member = this.args.user_member || this.args.flt_member;

    return this.flt_all_roles ||
             (member ?
                this.roles.some((x) => (x.enabled && flt.role(member) === x.symbol)) :
                this.roles.some((x) => (x.enabled && flt.pilot1_role === x.symbol)));
  }

  flight_launch_matches(flt) {
    return this.flt_all_launches || this.launches.some((x) => (x.enabled && flt.launch_type === x.symbol ));
  }

  flight_pilot_matches(flt) {
    return !this.flt_pilot ||
           (flt.pilot1_name && flt.pilot1_name.toLowerCase().includes(this.flt_pilot.toLowerCase())) ||
           (flt.pilot2_name && flt.pilot2_name.toLowerCase().includes(this.flt_pilot.toLowerCase()));
  }

  get filtered_models() {
    return this.args.flights.filter((x) => (
      this.flight_role_matches(x) &&
      this.flight_class_matches(x) &&
      this.flight_launch_matches(x) &&
      this.flight_pilot_matches(x) &&
      (!this.args.pilot_id || (x.pilot1 && x.pilot1.id === this.args.pilot_id) || (x.pilot2 && x.pilot2.id === this.args.pilot_id)) &&
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

  // ------------------

  @tracked flt_show = false;
  @action flt_show_toggle(ev) {
    this.flt_show = !this.flt_show;
  }

  // ------------------

  @tracked flt_all_classes = true;
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

  @tracked flt_all_roles = true;
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

  //-----------

  @tracked flt_all_launches = true;
  @action flt_all_launches_change(ev) {
    this.flt_all_launches = ev.target.checked;

    if (ev.target.checked) {
      this.launches.forEach((x) => (x.enabled = true));
    }
  }

  @action flt_launch_change(ev) {
    if (ev.symbol === null) {
      const launch = this.launches.forEach((x) => (x.enabled = true));
      this.flt_all_launches = true;
    } else {
      const launch = this.launches.forEach((x) => (x.enabled = (x.symbol === ev.symbol)));
      this.flt_all_launches = false;
    }
  }

  get flt_launch_sel() {
    return this.launches.find((x) => (x.symbol === this.flt_launch));
  }

  get flt_launch_opts() {
    return [{symbol: null, name: '-' }].concat(this.launches);
  }

  // ------------------

  @tracked flt_pilot;
  @action flt_pilot_change(ev) {
    this.flt_pilot = ev.target.value;
  }

  // ------------------

  @tracked flt_reg;
  @action flt_reg_change(ev) {
    this.flt_reg = ev.target.value;
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

  //-----------

  @action goto_flight_new() {
    this.router.transitionTo('authen.flight.new');
  }

  //-----------

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
