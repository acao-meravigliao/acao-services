import { VosModel, attr, vosBelongsTo, vosHasMany } from '@vihai/ember-vos';

export default class YggCorePersonAclEntryModel extends VosModel {
  @attr('string') capability;
}
