import { helper } from '@ember/component/helper';

export default helper(function formatDuration([dur, secs]) {
  if (!dur)
    return '';

  let hh = Math.floor(dur / 3600).toFixed().padStart(2, '0');
  let mm = Math.floor((dur % 3600) / 60).toFixed().padStart(2, '0');
  let ss = Math.floor((dur % 60)).toFixed().padStart(2, '0');

  return `${hh}:${mm}` + (secs ? `:${ss}` : '');
});
