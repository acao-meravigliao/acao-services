import { helper } from '@ember/component/helper';
import * as moment from 'moment';

export default helper(function formatDateFromNow([ secs ]) {
  return secs ? moment().subtract(secs * 1000).fromNow(true) : '';
});
