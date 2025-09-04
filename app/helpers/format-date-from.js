import { helper } from '@ember/component/helper';
import moment from 'moment';

export default helper(function formatDateFrom([ date, now, ago ]) {
  return moment(date).from(now, ago === false);
});
