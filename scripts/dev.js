const webpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const path = require('path');

const config = require('../configs/webpack.dev.conf');
const options = require('../configs/webpack.server.conf');

webpackDevServer.addDevServerEntrypoints(
  config,
  Object.assign(
    {},
    {
      clientLogLevel: 'warning',
    },
    options,
  ),
);

const compiler = webpack(config);
const server = new webpackDevServer(compiler, options);

server.listen(options.port, options.host, () => {});
