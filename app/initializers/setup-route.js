import Ember from 'ember';

export function initialize() {
  Ember.Route.reopen({
    mainTitle: '',
    breadcrumbs: [],
    setupController: function(controller, model) {
console.log("PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM", this);

      this._super(controller, model);

      var app = this.controllerFor('application');

      if(app) {

        app.set('mainTitle', this.mainTitle);
        app.set('breadcrumbs', this.breadcrumbs);
      }
    }
  });
}

export default {
  name: 'setup-route',
  initialize: initialize
};
