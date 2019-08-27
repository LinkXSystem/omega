/**
 * @doc https://webpack.docschina.org/configuration/dev-server/
 */

const path = require('path');

const HOST = 'localhost';
const PORT = process.env.PORT || 8080;
const PublicPath = '/';

const TargetHtmlTemplateFolder = path.resolve(__dirname, '..', 'template');

module.exports = {
  contentBase: TargetHtmlTemplateFolder,
  compress: true,
  quiet: true,
  hot: true,
  host: HOST,
  port: PORT,
  open: true,
  overlay: true,
};
