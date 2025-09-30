import BaseRoute from '../base-route';
import { service } from '@ember/service';
import { hash, all } from 'rsvp';

export default class AuthenIndexRoute extends BaseRoute {
  @service session;
  @service store;

  model() {
    return this.select_as_model([
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
         {
          from: 'member',
          to: 'membership',
          dig: {
            from: 'membership',
            to: 'year',
          },
         },
        ],
       },
      ]
     },
    ]).then((res) => {
      return {
        person: this.store.peekRecord('ygg--core--person', this.session.person_id),
        memberships: this.store.peekSelected('ygg--acao--membership', res.sel),
      };
    });
  }
}
