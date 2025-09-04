import { helper } from '@ember/component/helper';
import moment from 'moment';

export default helper(function formatDateFromNow([ date, ago ]) {
  return moment(date).fromNow(ago === false);
});
