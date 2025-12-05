import BaseRoute from '../../base-route';
import { service } from '@ember/service';

export default class AuthenFaiCardShowRoute extends BaseRoute {
  @service store;
  @service vos;

  model(params) {
    return this.select_as_model([
     {
      type: 'ygg--acao--fai-card',
      id: params.id,
      dig: [
       {
        from: 'fai_card',
        to: 'member',
        dig: {
          from: 'acao_member',
          to: 'person',
        },
       },
      ],
     },
    ]);
  }
}
