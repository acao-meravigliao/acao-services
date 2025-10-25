import Controller from '@ember/controller';
import { inject as controller } from '@ember/controller';
import { service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class AuthenMembershipRenewPrivacyController extends Controller {
  @service session;
  @service router;
  @controller('authen.membership.renew') wizard_controller;

  get wizard() { return this.wizard_controller.wizard; }

  // Matcher that consider "null" as always false
  is_true = (val) => (val === true);
  is_false = (val) => (val === false);

  @tracked consent_association;
  @action consent_association_on_change(el) {
    this.consent_association = el.target.value === 'yes';
  }

  @tracked consent_surveillance;
  @action consent_surveillance_on_change(el) {
    this.consent_surveillance = el.target.value === 'yes';
  }

  @tracked consent_accessory;
  @action consent_accessory_on_change(el) {
    this.consent_accessory = el.target.value === 'yes';
  }

  @tracked consent_profiling;
  @action consent_profiling_on_change(el) {
    this.consent_profiling = el.target.value === 'yes';
  }

  @tracked consent_magazine;
  @action consent_magazine_on_change(el) {
    this.consent_magazine = el.target.value === 'yes';
  }

  @tracked consent_fai;
  @action consent_fai_on_change(el) {
    this.consent_fai = el.target.value === 'yes';
  }

  @tracked consent_marketing;
  @action consent_marketing_on_change(el) {
    this.consent_marketing = el.target.value === 'yes';
  }

  @action accept() {
    this.wizard.update({
      privacy_accepted: true,
      consent_association: this.consent_association,
      consent_surveillance: this.consent_surveillance,
      consent_accessory: this.consent_accessory,
      consent_profiling: this.consent_profiling,
      consent_magazine: this.consent_magazine,
      consent_fai: this.consent_fai,
      consent_marketing: this.consent_marketing,
    })

    if (this.wizard.email_allowed)
      this.wizard.next('bill');
    else
      this.wizard.next('mailing');
  }

  @action back() {
    this.wizard.prev();
  }
}
