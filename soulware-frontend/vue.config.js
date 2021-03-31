const path = require("path");

module.exports = {
  chainWebpack: (config) => {
    config.module.rules.delete("eslint");
    const types = ["vue-modules", "vue", "normal-modules", "normal"];
    types.forEach((type) =>
      addStyleResource(config.module.rule("scss").oneOf(type))
    );
  },
  transpileDependencies: ["vuetify"],

  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "scss",
      patterns: [],
    },
  },
};

function addStyleResource(rule) {
  rule
    .use("style-resource")
    .loader("style-resources-loader")
    .options({
      patterns: [path.resolve(__dirname, "./src/assets/common.scss")],
    });
}
