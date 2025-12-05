import BaseRoute from '../../base-route';
import { service } from '@ember/service';

export default class AuthenMedicalIndexRoute extends BaseRoute {
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
          to: 'medical',
        },
      },
     },
    ]);

    if (sel.get_cls('ygg--acao--medical').length === 1)
      this.router.transitionTo('authen.medical.show', sel.get_first('ygg--acao--medical').id);

    return sel;
  }
}
