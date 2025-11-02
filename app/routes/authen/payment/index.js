import BaseRoute from '../../base-route';
import { service } from '@ember/service';

export default class AuthenPaymentIndexRoute extends BaseRoute {
  @service session;

  model(params) {
  }
}
