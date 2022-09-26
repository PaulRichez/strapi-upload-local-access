'use strict';

/**
 * `accessDownload` middleware
 */

module.exports = (config, { strapi }) => {
  // Add your own logic here.
  return async (ctx, next) => {
    strapi.log.info('In accessDownload middleware.');
    const hashWithFormat = ctx.url.split('/uploads/')[1];
    let hash = '';
    if (hashWithFormat.split('_')[0]) {
      hash = hashWithFormat.substring(hashWithFormat.indexOf("_") + 1).split('.')[0];
    }
    const res = await strapi.db.query('plugin::upload.file').findMany({
      where: {
        $or: [
          {
            url: ctx.url
          },
          {
            hash: hash
          }
        ]
      }
    });
    if (res && res.length > 0) {
      const file = res[0];
      console.log(file)
    }
    await next();
  };
};
