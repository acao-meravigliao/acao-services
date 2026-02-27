import Controller, { inject as controller } from '@ember/controller';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { VihaiException, RemoteException } from '@vihai/vihai-exceptions';
import { debounce } from '@ember/runloop';

class ServerResponseFormatError extends VihaiException { type = 'ServerResponseFormatError'; }

export default class PmIndexController extends Controller {
  @service vos;
  @service router;

  @tracked searching = false;
  @tracked search_results;

  @action did_insert_search_input(el) {
    el.focus();

    el.addEventListener("keypress", (ev) => {
      if (ev.key === "Enter" && this.search_results && this.search_results.length === 1) {
        ev.preventDefault();
        this.router.transitionTo('authen.pm.show', this.search_results[0].acao_member_id);
      }
    });
  }

  @action search_input_on_input(ev) {
    this.searching = ev.target.value.length > 0;

    debounce(this, this.do_search, ev.target.value, 250);
  }

  @action search_input_on_change(ev) {
  }

  async do_search(text) {
    const res = await this.vos.class_call('ygg--core--person', 'search', { query: text });

    this.search_results = res.body;
  }

  // -----------

  get relevant_members() {
    return [];//this.model.get_cls('ygg--acao--member');
  }

}
