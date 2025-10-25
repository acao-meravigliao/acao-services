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

  get wizard() { return this.wizard_controller.wizard; }

  get form_invalid() {
    return !this.wizard.person.contacts.every((x) => (x.isDeleted || x.is_valid));
  }

  get submit_disabled() {
    return this.form_invalid || this.in_progress;
  }

  get emails() {
    return this.wizard.person.contacts.filter((x) => ( !x.isDeleted && x.type === 'email'));
  }

  @action email_add() {
    let rec = this.store.createRecord('ygg--core--person--contact', {
      id: crypto.randomUUID(),
      type: 'email',
      value: '',
    });

    // Fixme ---------------- put this in store
    rec.set('_sels', A());
    this.store.objs[rec.id] = rec;
    // -----------------------------------------

    this.store.rels.pushObject(new VosRelation(this.wizard.person, 'person', rec, 'contact'), A());
  }

  @action email_change(contact, ev) {
    contact.value = ev.target.value.trim();
  }

  @action email_remove(contact, ev) {
    contact.deleteRecord();
  }

  //-----------

  get fixed_phones() {
    return this.wizard.person.contacts.filter((x) => ( !x.isDeleted && x.type === 'phone'));
  }

  @action fixed_phone_add() {
    let rec = this.store.createRecord('ygg--core--person--contact', {
      id: crypto.randomUUID(),
      type: 'phone',
      value: '',
    });

    // Fixme ---------------- put this in store
    rec.set('_sels', A());
    this.store.objs[rec.id] = rec;
    // -----------------------------------------

    this.store.rels.pushObject(new VosRelation(this.wizard.person, 'person', rec, 'contact'), A());
  }

  @action fixed_phone_change(contact, ev) {
    contact.value = ev.target.value.trim();
  }

  @action fixed_phone_remove(contact, ev) {
    contact.deleteRecord();
  }

  //-----------

  get mobile_phones() {
    return this.wizard.person.contacts.filter((x) => ( !x.isDeleted && x.type === 'mobile'));
  }

  @action mobile_phone_add() {
    let rec = this.store.createRecord('ygg--core--person--contact', {
      id: crypto.randomUUID(),
      type: 'mobile',
      value: '',
    });

    // Fixme ---------------- put this in store
    rec.set('_sels', A());
    this.store.objs[rec.id] = rec;
    // -----------------------------------------

    this.store.rels.pushObject(new VosRelation(this.wizard.person, 'person', rec, 'contact'), A());
  }

  @action mobile_phone_change(contact, ev) {
    contact.value = ev.target.value.trim();
  }

  @action mobile_phone_remove(contact, ev) {
    contact.deleteRecord();
  }

  //-----------

  async commit() {
    this.wizard.person.contacts.forEach((contact) => {
      if (contact.value.length === 0) {
        contact.deleteRecord();
      }
    });

    let changes = [];

    this.wizard.person.contacts.forEach((contact) => {
      if (contact.dirtyType === 'created') {
        console.log("CREATED", contact);

        changes.push({ op: 'create', entype: 'obj', obj: contact, });
        changes.push({ op: 'create', entype: 'rel', a: contact.id, a_as: 'contact', b: this.wizard.person.id, b_as: 'person' });

      } else if (contact.dirtyType === 'updated') {
        console.log("UPDATED", contact);
        let attrs = {};
        let chattr = contact.changedAttributes();
        Object.keys(chattr).forEach((key) => { attrs[key] = chattr[key][1] });
        changes.push({ op: 'update', entype: 'obj', id: contact.id, obj: attrs });

      } else if (contact.dirtyType === 'deleted') {
        console.log("DELETED", contact);
        changes.push({ op: 'delete', entype: 'obj', id: contact.id });
      }
    });

//    Object.entries(this.store.objs).forEach(([ obj_id, obj ]) => {
//    });
//    this.store.commit_change(change);

console.log("CHANGES=", changes);

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
