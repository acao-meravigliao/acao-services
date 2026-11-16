import EmberApp from 'ember-cli/lib/broccoli/ember-app.js';
import { compatBuild } from '@embroider/compat';

export default async function (defaults) {
  const { buildOnce } = await import('@embroider/vite');

  let app = new EmberApp(defaults, {
    sassOptions: {
      includePaths: [
        'node_modules/bulma',
        'node_modules/ember-basic-dropdown/',
        'node_modules/ember-power-select/',
      ],
      onlyIncluded: true,
    },
    'ember-cli-favicon': {
      faviconsConfig: {
        icons: {
        },
      },
    },
  });

  return compatBuild(app, buildOnce);
};
