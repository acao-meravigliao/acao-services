import { helper } from '@ember/component/helper';

export default helper(function formatDuration([dur]) {
  return dur ? `${(dur / 3600000).toFixed().padStart(2, '0')}:${((dur % 3600000) / 60000).toFixed().padStart(2, '0')}:${((dur % 60000) / 1000).toFixed().padStart(2, '0')}` : '';
});
