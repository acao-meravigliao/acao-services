import BaseRoute from '../../../base-route';

export default class WizardPageRoute extends BaseRoute {
  get wizard() {
    return this.modelFor('authen.membership.renew');
  }

  beforeModel(transition) {
    super.beforeModel(arguments);

    this.wizard.entered_page(transition.to.localName, transition.to.queryParams);
  }
}
