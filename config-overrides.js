const { codeInspectorPlugin } = require('code-inspector-plugin');

module.exports = function override(config, env) {
  config.plugins.push(
    codeInspectorPlugin({
      bundler: 'webpack',
    })
  );
  return config;
};
