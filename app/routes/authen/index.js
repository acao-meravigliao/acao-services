import BaseRoute from '../base-route';
import { service } from '@ember/service';
import { hash, all } from 'rsvp';

export default class AuthenIndexRoute extends BaseRoute {
  @service session;
  @service store;
  @service vos;

  model() {
    return this.select_as_model([
     {
      type: 'ygg--acao--roster-entry',
      filter: { person_id: this.session.person_id },
      dig: {
        from: 'entry',
        to: 'day',
      },
     },
    ]);
  }
}
