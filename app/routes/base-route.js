import VosRoute from '@vihai/ember-vos/routes/vos-route';
import config from '../config/environment';

export default class BaseRoute extends VosRoute {
  home_route = config.main_route;
  login_route = config.login_route;
}
