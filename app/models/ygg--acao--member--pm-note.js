import { VosModel, attr, vosBelongsTo, vosHasMany } from '@vihai/ember-vos';

export default class YggAcaoMemberPmNoteModel extends VosModel {
  @attr('date') created_at;
  @attr('date') updated_at;

  @attr('string') cls;
  @attr('string') text;

  @vosBelongsTo('pm_note', 'member') member;
  @vosBelongsTo('pm_note', 'author') author;
}
