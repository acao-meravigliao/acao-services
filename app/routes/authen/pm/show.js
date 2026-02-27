import BaseRoute from '../../base-route';
import { service } from '@ember/service';

export default class AuthenPmShowRoute extends BaseRoute {
  @service store;
  @service vos;

  async model(params) {
    const sel_p = this.select_as_model(
     {
      type: 'ygg--acao--member',
      id: params.id,
      dig: [
       {
        from: 'acao_member',
        to: 'person',
       },
       {
        from: 'member',
        to: 'role',
       },
       {
        from: 'member',
        to: 'license',
       },
       {
        from: 'member',
        to: 'medical',
       },
       {
        from: 'member',
        to: 'pm_note',
        dig: [
         {
          from: 'pm_note',
          to: 'author',
         },
         {
          from: 'pm_note',
          to: 'member',
         },
        ]
       },
      ],
     },
    );

    const cur_p = this.vos.call(params.id, 'currency', { });

    const sel = await sel_p;

    sel.member_id = params.id;
    sel.currency_status = (await cur_p).body;

    return sel;
  }
}
