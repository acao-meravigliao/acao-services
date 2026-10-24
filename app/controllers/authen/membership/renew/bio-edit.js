import Controller from '@ember/controller';
import { inject as controller } from '@ember/controller';
import { service } from '@ember/service';
import { action } from '@ember/object';
import { VosRelation } from '@vihai/ember-vos';
import { A } from '@ember/array';
import { tracked } from '@glimmer/tracking';
import { VihaiException, RemoteException } from '@vihai/vihai-exceptions';

export default class AuthenMembershipRenewBioEditController extends Controller {
  @service session;
  @service router;
  @service store;
  @service vos;
  @controller('authen.membership.renew') wizard_controller;

  @tracked error;
  @tracked in_progress = false;

  get person() {
    return this.esel.get(this.wizard.person.id);
  }

  get wizard() { return this.wizard_controller.wizard; }

  get form_invalid() {
    return !this.person.emails.every((x) => (x.is_valid)) ||
           !this.person.contacts.every((x) => (x.is_valid));
  }

  get submit_disabled() {
    return this.form_invalid || this.in_progress;
  }

  get emails() {
    return this.person.emails;
  }

  @action email_add() {
    let rec = this.esel.obj_new('ygg--core--person--email', {
      id: crypto.randomUUID(),
      email: '',
    });

    this.esel.obj_add(rec);
    this.esel.rel_add(new VosRelation(this.person, 'person', rec, 'email'));
  }

  @action email_change(email, ev) {
    email.value = ev.target.value.trim();
  }

  @action email_remove(email, ev) {
    this.esel.obj_del(email);
  }

  //-----------

  get fixed_phones() {
    return this.person.contacts.filter((x) => (x.type === 'phone'));
  }

  @action fixed_phone_add() {
    let rec = this.esel.obj_new('ygg--core--person--contact', {
      id: crypto.randomUUID(),
      type: 'phone',
      value: '',
    });

    this.esel.obj_add(rec);
    this.esel.rels.add(new VosRelation(this.person, 'person', rec, 'contact'));
  }

  @action fixed_phone_change(contact, ev) {
    contact.value = ev.target.value.trim();
  }

  @action fixed_phone_remove(contact, ev) {
    this.esel.obj_del(contact);
  }

  //-----------

  get mobile_phones() {
    return this.person.contacts.filter((x) => (x.type === 'mobile'));
  }

  @action mobile_phone_add() {
    let rec = this.esel.obj_new('ygg--core--person--contact', {
      id: crypto.randomUUID(),
      type: 'mobile',
      value: '',
    });

    this.esel.obj_add(rec);
    this.esel.rels.add(new VosRelation(this.person, 'person', rec, 'contact'));
  }

  @action mobile_phone_change(contact, ev) {
    contact.value = ev.target.value.trim();
  }

  @action mobile_phone_remove(contact, ev) {
    this.esel.obj_del(contact);
  }

  //-----------
  async commit() {
    const changes = this.esel.compute_changes(this.sel);

    if (changes.length > 0)
      return await this.vos.change(changes);
  }

  @action submit() {
    this.error = null;
    this.in_progress = true;

    this.commit().then(() => {
      this.in_progress = false;
      this.wizard.prev('bio');
    }).catch((err) => {
      this.in_progress = false;
      this.error = err.exception;
    });
  }

  @action back() {
    this.wizard.prev();
  }
}
