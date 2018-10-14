import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { computed, observer } from '@ember/object';
import { on } from '@ember/object/evented';
import { once } from '@ember/runloop';

export default Controller.extend({
  ws: service('web-socket'),
  headData: service(),

  // -------- Page title hack  -------------------
  pageTitleList: service(),
  myPageTitle: '',

  titleChangeObserver: on('init', observer('pageTitleList.sortedTokens.@each', function() {
    once(this, function() {
      this.set('myPageTitle', this.get('pageTitleList').toString());
    });
  })),

});
