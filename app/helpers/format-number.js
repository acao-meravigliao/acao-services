import { helper } from '@ember/component/helper';

export default helper(function formatNumber([number, decimals, unit]) {
  let prefix;
  unit = unit || '';

  if (!number) { return ''; }

  return number.toFixed(decimals) + (unit ? (" " + unit) : "");
});
