import Controller from '@ember/controller';
import { computed } from '@ember/object';
import Semantic from 'acao-services/themes/semantic';

export default Controller.extend({
  columns: computed(function() {
    return [
     {
      title: 'Data',
      propertyName: 'recorded_at',
      component: 'columnDate',
     },
     {
      title: 'Descrizione',
      propertyName: 'descr',
     },
     {
      title: 'Ammontare',
      propertyName: 'amount',
     },
    ];
  }),

  themeInstance: Semantic,


  offset: 0,
  limit: 50,
  dir: 'desc',
  sort: 'recorded_at',
});
