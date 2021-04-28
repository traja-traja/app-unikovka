// vue.config.js

/**
 * @type {import('@vue/cli-service').ProjectOptions}
 */
 module.exports = {
    css: {
      loaderOptions: {
        sass: {
            prependData: `@import "@/main.scss";`
          }
      }
    }
  }