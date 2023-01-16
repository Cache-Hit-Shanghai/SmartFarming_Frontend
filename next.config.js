const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');
// const { i18n } = require('./next-i18next.config');
const path = require('path');
// const WebpackPwaManifest = require('webpack-pwa-manifest');
module.exports = (phase) => {
  return {
    webpack: (config, options) => {
      config.module.rules.push({
        test: /\.md$/,
        use: 'raw-loader',
      });

      // only when update
      // config.plugins.push(
      //   new WebpackPwaManifest({
      //     name: 'tower iot',
      //     short_name: 'wind',
      //     description: 'iot project',
      //     background_color: '#333',
      //     theme_color: '#333',
      //     filename: 'manifest.json',
      //     publicPath: '/manifest/',
      //     icons: [
      //       {
      //         src: path.resolve('public/imgs/icon.png'),
      //         sizes: [96, 128, 192, 256, 384, 512], // multiple sizes
      //       },
      //     ],
      //     ios: {
      //       'apple-mobile-web-app-title': 'tower iot',
      //       'apple-mobile-web-app-status-bar-style': '#000',
      //       'apple-mobile-web-app-capable': 'yes',
      //       'apple-touch-icon': 'https://portal.pviotrd.com/imgs/icon.png',
      //     },
      //   })
      // );

      return config;
    },
    distDir: phase === PHASE_DEVELOPMENT_SERVER ? '.next' : 'build',
    async headers() {
      return [
        {
          source: '/login',
          headers: [
            {
              key: 'Access-Control-Allow-Origin',
              value: '*',
            },
            {
              key: 'Access-Control-Allow-Credentials',
              value: 'true',
            },
            {
              key: 'Access-Control-Allow-Methods',
              value: '*',
            },
            {
              key: 'Access-Control-Allow-Headers',
              value: 'Content-Type',
            },
            {
              key: 'Access-Control-Expose-Headers',
              value: '*',
            },
          ],
        },
      ];
    },

    // i18n,
  };
};
