'use strict';

module.exports = ({ strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('upload-local-owner')
      .service('myService')
      .getWelcomeMessage();
  },
});
