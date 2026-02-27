import { helper } from '@ember/component/helper';

export default helper(function formatDateForInput([date]) {
  return date ? date.toISOString().split('T')[0] : null;
});
