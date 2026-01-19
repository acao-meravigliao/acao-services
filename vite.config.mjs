import { defineConfig } from 'vite';
import { extensions, classicEmberSupport, ember } from '@embroider/vite';
import { babel } from '@rollup/plugin-babel';
import { loadTranslations } from '@ember-intl/vite';

export default defineConfig({
  server: {
    allowedHosts: true,
    proxy: {
      '/ygg': {
        target: 'http://localhost:3330/',
        changeOrigin: true,
      },
      '/vos2': {
        target: 'ws://localhost:3330/',
        ws: true,
        //rewriteWsOrigin: true,
        changeOrigin: true,
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
    loadTranslations(),
  ],
});
