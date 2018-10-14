import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { isEmpty } from '@ember/utils';
import { inject as service } from '@ember/service';
import Semantic from 'acao-services/themes/semantic';
import moment from 'moment';
import numeral from 'numeral';

export default Controller.extend({
  columns: computed(function() {
    return [
     {
      title: 'Marche',
      propertyName: 'registration',
      width: '160px',
     },
     {
      title: 'Sigle Gara',
      propertyName: 'race_registration',
      width: '120px',
     },
     {
      title: 'Proprietario',
      propertyName: 'owner.last_name',
      width: '200px',
     },
     {
      title: 'ID Flarm',
      propertyName: 'flarm_identifier',
     },
     {
      title: 'ID ICAO',
      propertyName: 'icao_identifier',
     },
    ];
  }),

  themeInstance: Semantic,

  offset: 0,
  limit: 50,
  sort: 'registration',
  dir: 'asc',
});
