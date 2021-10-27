import { helper } from '@ember/component/helper';

export default helper(function formatNumber([number, decimals]) {
  return number.toFixed(decimals);
});
