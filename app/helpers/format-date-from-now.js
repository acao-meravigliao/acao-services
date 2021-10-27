import { helper } from '@ember/component/helper';
import * as moment from 'moment';

export default helper(function formatDateFromNow([ date ]) {
  return moment(date).fromNow(true);
});
