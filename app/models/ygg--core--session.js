import { VosModel, attr, vosBelongsTo, vosHasMany } from '@vihai/ember-vos';

export default class YggCoreSessionModel extends VosModel {
  @attr('date') created_at;
  @attr('date') updated_at;
  @attr('date') expires;
  @attr('string') auth_identity_id;
  @attr('string') auth_method;
  @attr('string') auth_confidence;
  @attr('string') status;
  @attr('string') close_reason;
  @attr('string') close_time;
  @attr('string') sti_type;
  @attr('string') auth_person_id;
  @attr('string') auth_credential_id;
  @attr('string') language_id;
  @attr('string') http_remote_addr;
  @attr('string') http_remote_port;
  @attr('string') http_x_forwarded_for;
  @attr('string') http_via;
  @attr('string') http_server_addr;
  @attr('number') http_server_port;
  @attr('string') http_server_name;
  @attr('string') http_referer;
  @attr('string') http_user_agent;
  @attr('string') http_request_uri;

  @vosBelongsTo('session', 'person') person;
  @vosBelongsTo('session', 'credential') credential;
}
