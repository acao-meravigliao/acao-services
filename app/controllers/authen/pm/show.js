import Controller, { inject as controller } from '@ember/controller';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import VosRelation from '@vihai/ember-vos/utils/vos-relation';

export default class PmShowController extends Controller {
  @service vos;
  @service router;
  @service toaster;
  @controller('authen') authen_controller;

  get sel() {
    return this.editing ? this.esel : this.model;
  }

  get member() {
    return this.sel.get(this.model.member_id);
  }

  get pm_notes() {
    return this.sel.get_cls('ygg--acao--member--pm-note');
  }

  get cs() {
    return this.model.currency_status;
  }

  // ================ Editing

  @tracked esel;
  @tracked editing = false;
  @tracked edit_committing = false;

  @action edit_start() {
    this.editing = true;

    this.esel = this.model.snapshot();
  }

  @action async edit_commit() {
    this.edit_committing = true;

    const changes = this.esel.compute_changes(this.model);

    console.log("CHANGES=", changes);

    if (changes.length > 0) {
      try {
        await this.vos.change(changes);
      } catch(e) {
        this.toaster.report('Errore nell\'applicazione della modifica', 'danger');
        this.edit_committing = false;
        return;
      }
    }

    this.edit_committing = false;
    this.toaster.report('Modifica effettuata', 'success', { timeout: 2000 });

    this.editing = false;
  }

  @action edit_abort() {
    this.editing = false;
  }

  // -------------------------------

  @action edit_wind_rating(ev) {
    this.member.wind_rating = ev.target.checked;
  }

  @action edit_wind_lim(ev) {
    this.member.wind_lim = ev.target.checked;
  }

  @action edit_wind_lim_to(ev) {
    this.member.wind_lim_to = new Date(ev.target.value.trim());
  }

  @action edit_wind_lim_reason(ev) {
    this.member.wind_lim_reason = ev.target.value.trim();
  }

  @action edit_astir_rating(ev) {
    this.member.astir_rating = ev.target.checked;
  }

  @action edit_astir_lim(ev) {
    this.member.astir_lim = ev.target.checked;
  }

  @action edit_astir_lim_to(ev) {
    this.member.astir_lim_to = new Date(ev.target.value.trim());
  }

  @action edit_astir_lim_reason(ev) {
    this.member.astir_lim_reason = ev.target.value.trim();
  }

  @action edit_discus_rating(ev) {
    this.member.discus_rating = ev.target.checked;
  }

  @action edit_discus_lim(ev) {
    this.member.discus_lim = ev.target.checked;
  }

  @action edit_discus_lim_to(ev) {
    this.member.discus_lim_to = new Date(ev.target.value.trim());
  }

  @action edit_discus_lim_reason(ev) {
    this.member.discus_lim_reason = ev.target.value.trim();
  }

  @action edit_duodiscus_rating(ev) {
    this.member.duodiscus_rating = ev.target.checked;
  }

  @action edit_duodiscus_lim(ev) {
    this.member.duodiscus_lim = ev.target.checked;
  }

  @action edit_duodiscus_lim_to(ev) {
    this.member.duodiscus_lim_to = new Date(ev.target.value.trim());
  }

  @action edit_duodiscus_lim_reason(ev) {
    this.member.duodiscus_lim_reason = ev.target.value.trim();
  }

  @action edit_solo_lim(ev) {
    this.member.solo_lim = ev.target.checked;
  }

  @action edit_solo_lim_to(ev) {
    this.member.solo_lim_to = new Date(ev.target.value.trim());
  }

  @action edit_solo_lim_reason(ev) {
    this.member.solo_lim_reason = ev.target.value.trim();
  }

  @action edit_pax_lim(ev) {
    this.member.pax_lim = ev.target.checked;
  }

  @action edit_pax_lim_to(ev) {
    this.member.pax_lim_to = new Date(ev.target.value.trim());
  }

  @action edit_pax_lim_reason(ev) {
    this.member.pax_lim_reason = ev.target.value.trim();
  }

  @action edit_pm_note_remove(pm_note) {
console.log("AAAAAAAA1");

    const rel = this.sel.rels.values().find((x) => (x.match(pm_note, 'pm_note', this.member, 'member')));

console.log("AAAAAAAA2", pm_note);
    this.sel.obj_del(pm_note);
    this.sel.rel_del(rel);
  }

  // Add modal
  @tracked edit_pm_note_adding = false;

  @action edit_pm_note_add(symbol) {
    this.edit_pm_note_adding = true;
  }

  get edit_pm_note_add_valid() {
    return this.edit_pm_note_add_cls &&
           this.edit_pm_note_add_text;
  }

  @tracked edit_pm_note_add_cls = '';
  @tracked edit_pm_note_add_text;

  @action edit_pm_note_add_cls_change(ev) {
    this.edit_pm_note_add_cls = ev.target.value.trim();
  }

  @action edit_pm_note_add_text_change(ev) {
    this.edit_pm_note_add_text = ev.target.value.trim();
  }

  @action edit_pm_note_add_cancel() {
    this.edit_pm_note_adding = false;
  }

  @action edit_pm_note_submit() {
    const obj = this.sel.obj_new('ygg--acao--member--pm-note', {
      cls: this.edit_pm_note_add_cls,
      text: this.edit_pm_note_add_text,
    });

    this.sel.obj_add(obj);
    this.sel.rel_add(new VosRelation(obj, 'pm_note', this.member, 'member'));
    this.sel.rel_add(new VosRelation(obj, 'pm_note', this.authen_controller.member, 'author'));

    this.edit_pm_note_adding = false;
  }

  //-------------------------


}
