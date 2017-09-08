import Ember from 'ember';

export default Ember.Component.extend({

  init() {
    this._super(...arguments);
console.log("PPPPPPPPPPPPPPPPPPPPPPPPPPPP");
    let map = new google.maps.Map(document.getElementById('map-canvas'), {
      center: {lat: -34.397, lng: 150.644},
      zoom: 8
    });
  },

});
