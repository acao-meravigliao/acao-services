import Default from './default';
import Ember from 'ember';

const {computed: {alias}} = Ember;

export default Default.extend({
  table: 'ui selectable striped celled sortable table',
  'column-visible': 'toggle on icon',
  'column-hidden': 'toggle off icon',
  'sort-asc': 'sort ascending icon',
  'sort-desc': 'sort descending icon',
  clearAllFiltersIcon: 'remove circle icon',
  footerSummaryNumericPagination: 'nine wide column',
  footerSummaryDefaultPagination: alias('footerSummaryNumericPagination'),
  pageSizeWrapper: 'two wide column',
  paginationWrapperNumeric: 'five wide column',
  paginationWrapperDefault: alias('paginationWrapperNumeric'),
  tfooterInternalWrapper: 'ui grid',
}).create();
