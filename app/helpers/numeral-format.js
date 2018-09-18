import { helper } from '@ember/component/helper';
import numeral from 'numeral';

export function numeralFormat([ value ], namedArgs) {
  return numeral(value).format(namedArgs.format);
}

export default helper(numeralFormat);
