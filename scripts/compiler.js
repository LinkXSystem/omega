const webpack = require('webpack');
const path = require('path');

const configuration = require('../configs/webpack.package.prod.config');

const [library] = process.argv.slice(2, 4);
process.env.MODULE_NAME = library;

const TargetFileOfCompile = path.resolve(__dirname, '..', `packages/${library}/index.ts`);
const OutputOfDistFolder = path.resolve(__dirname, '..', `dist/packages/${library}`);

const target = Object.assign({}, configuration, {
  entry: TargetFileOfCompile,
  output: {
    path: OutputOfDistFolder,
    filename: `${library}.min.js`,
    library: library,
    libraryExport: "default",
    libraryTarget: 'umd',
    // 以 window 为 global 对象的实现只针对浏览器实现
    globalObject: 'window',
  }
});

(function () {
  webpack(target).run();
})();
