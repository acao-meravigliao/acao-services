import { helper } from '@ember/component/helper';

export default helper(function formatNumberEng([number, decimals, unit]) {
  let prefix;
  unit = unit || '';

  if (!number) { return ''; }
  else if (number > 1000000000000)      { number = number / 1000000000000 ; prefix = 'T'; }
  else if (number > 1000000000)         { number = number / 1000000000 ; prefix = 'G'; }
  else if (number > 1000000)            { number = number / 1000000 ; prefix = 'M'; }
  else if (number > 1000)               { number = number / 1000 ; prefix = 'k'; }
  else if (number > 1)                  { prefix = ''; }
  else if (number > 0.001)              { number = number * 1000 ; prefix = 'm'; }
  else if (number > 0.000001)           { number = number * 1000000 ; prefix = 'µ'; }
  else if (number > 0.000000001)        { number = number * 1000000000 ; prefix = 'n'; }
  else if (number > 0.0000000000001)    { number = number * 1000000000000 ; prefix = 'p'; }

  return number.toFixed(decimals) + ' ' + prefix + unit;
});
