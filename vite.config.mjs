import { defineConfig } from 'vite';
import { extensions, classicEmberSupport, ember } from '@embroider/vite';
import { babel } from '@rollup/plugin-babel';

export default defineConfig({
  server: {
    allowedHosts: true,
    proxy: {
      '/ygg': 'http://localhost:3330',
      '/vos2': {
        target: 'ws://localhost:3330/vos2',
        ws: true,
        //rewriteWsOrigin: true,
      },
    },
  },
  plugins: [
    classicEmberSupport(),
    ember(),
    // extra plugins here
    babel({
      babelHelpers: 'runtime',
      extensions,
    }),
  ],
});
