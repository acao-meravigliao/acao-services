import BaseRoute from '../../base-route';
import { service } from '@ember/service';

export default class AuthenLicenseIndexRoute extends BaseRoute {
  @service session;
  @service router;

  async model(params) {
    const sel = await this.select_as_model([
     {
      type: 'ygg--core--person',
      id: this.session.person_id,
      dig: {
        from: 'person',
        to: 'acao_member',
        dig: {
          from: 'member',
          to: 'license',
        },
      },
     },
    ]);

    if (sel.get_cls('ygg--acao--license').length === 1)
      this.router.transitionTo('authen.license.show', sel.get_first('ygg--acao--license').id);

    return sel;
  }
}
