'use strict';
const koaStatic = require('koa-static');
const range = require("koa-range");

module.exports = ({ strapi }) => {
  const UPLOAD_PATH = "/uploads/(.*)";
  const publicDir =
    typeof strapi.dirs.static === "object"
      ? strapi.dirs.static.public // Strapi 4.3+
      : strapi.dirs.public; // Strapi < 4.3
  const localServerConfig = strapi.config.get('plugin.upload.providerOptions.localeServer', {});

  strapi.server.routes([
    {
      method: "GET",
      path: UPLOAD_PATH,
      handler: [range, koaStatic(publicDir, { defer: true, ...localServerConfig })],
      config: {
        auth: false,
        middlewares: ['plugin::upload-local-access.accessDownload']
      },
    },
  ]);
};
