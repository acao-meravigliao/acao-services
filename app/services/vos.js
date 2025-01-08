import VosService from '@vihai/ember-vos/services/vos';
import config from 'acao-services/config/environment';

export default class OurVosService extends VosService {
  person_class = 'person';
  debug = 3;
  path = config.vos_url;
  keepalive_frequency = 5000;
  keepalive_timeout = 20000;
}
