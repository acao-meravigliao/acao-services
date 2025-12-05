import BaseRoute from '../base-route';
import { service } from '@ember/service';
import { hash, all } from 'rsvp';

export default class AuthenCurrencyRoute extends BaseRoute {
  @service session;
  @service store;

  async model() {
    const sel_p = this.select_as_model([
     {
      type: 'ygg--core--person',
      id: this.session.person_id,
      dig: [
       {
        from: 'person',
        to: 'acao_member',
        dig: [
         {
          from: 'member',
          to: 'roster_entry',
          dig: {
            from: 'entry',
            to: 'day',
          },
         },
        ],
       },
      ]
     },
    ]);

    const cur_p = this.vos.class_call('ygg--acao--member', 'my_currency', { });

    const sel = await sel_p;
    sel.currency_status = (await cur_p).body;

    return sel;
  }
}
