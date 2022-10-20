import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import fetch from 'fetch';

export default class SapRegistrationController extends Controller {
  @tracked first_name;
  @tracked last_name;
  @tracked email;
  @tracked email_error;
  @tracked fai_license;
  @tracked fai_license_error;

  @tracked submit_success = false;
  @tracked submit_error = null;
  @tracked submit_in_progress = false;

  @action first_name_changed(ev) {
    this.first_name = ev.target.value;
  }

  @action last_name_changed(ev) {
    this.last_name = ev.target.value;
  }

  @action email_changed(ev) {
    if (ev.target.value.indexOf('@') == -1)
      this.email_error = "Indirizzo e-mail invalido";
    else {
      this.email_error = null;
      this.email = ev.target.value;
    }
  }

  fai_licenses = [
   { number: '3306', first_name: 'Carlo', last_name: 'Maldivi' },
   { number: '3410', first_name: 'Paolo', last_name: 'Riccardi' },
  ];

  @tracked fai_license_found;

  @action fai_license_changed(ev) {
    if (ev.target.value.length < 1) {
      this.fai_license_error = "Numero tessera FAI troppo corto";
      return;
    }

    this.fai_license_error = null;
    let fai = this.fai_licenses.findBy('number', ev.target.value)

    this.fai_license_found = !!fai;

    if (fai) {
      this.first_name = fai.first_name;
      this.last_name = fai.last_name;
    } else {
      this.first_name = null;
      this.last_name = null;
    }

    this.fai_license = ev.target.value;
  }

  get form_invalid() {
    return !this.first_name ||
           !this.last_name ||
           !this.email ||
           this.email_error;
  }

  get submit_disabled() {
    return this.form_invalid || this.submit_in_progress;
  }

  @action submit() {
    this.submit_error = null;
    this.submit_in_progress = true;

    fetch('/api/enroll', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        fai_license: this.fai_license,
        first_name: this.first_name,
        last_name: this.last_name,
        email: this.email,
      }),
    }).then((res) => {
      if (res.ok)
        this.submit_success = true;
      else {
        this.submit_error = res.statusText;
      }
    }).catch((res) => {
      this.submit_error = "communication error";
    }).finally(() => {
      this.submit_in_progress = false;
    });
  }

  @action cancel() {
    this.fai_license = null;
    this.fai_license_error = null;
    this.first_name = null;
    this.first_name_error = null;
    this.last_name = null;
    this.last_name_error = null;
    this.email = null;
    this.email_error = null;
  }
}
