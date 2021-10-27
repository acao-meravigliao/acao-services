import { helper } from '@ember/component/helper';

export default helper(function formatEllipsis(value, max_len) {
  if (value.length > max_len)
    return value.slice(0, max_len) + '...';
  else
    return value;
});
