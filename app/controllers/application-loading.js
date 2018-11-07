import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
//import { computed, observer } from '@ember/object';
//import { on } from '@ember/object/evented';
//import { once } from '@ember/runloop';

export default Controller.extend({
  ws: service('vihai-object-streaming'),
});
