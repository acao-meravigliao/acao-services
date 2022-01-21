import Controller, { inject as controller } from '@ember/controller';
import { service } from '@ember/service';

export default class AuthenIndexController extends Controller {
  @service session;
  @service store;
  @service('my-clock') clock;
  @controller('authen') authenController;

  rosterEntriesSortOrder = ['roster_day.date'];

  //------------------- Renewal -------------------
  get currentYear() { return this.authenController.currentYear; }
  get nextYear() { return this.authenController.nextYear; }
  get nextRenewIsGoingToOpen() {  return this.authenController.nextRenewIsGoingToOpen; }

  //------------------- Roster -------------------
  get myNextRosterEntries() {
    return this.myNextRosterEntriesUnsorted.sortBy('rosterEntriesSortOrder');
  }

  get allRosterEntries() {
    return this.store.peekAll('ygg--acao--roster-entry');
  }

  get myNextRosterEntriesUnsorted() {
    return this.allRosterEntries.filter((item) => (
       item.belongsTo('person').id() == this.get('session.personId') &&
       item.belongsTo('roster_day').value().get('date') > new Date()
      )
    );
  }
}
