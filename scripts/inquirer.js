const inquirer = require('inquirer');
const spawn = require('child-process-promise').spawn;
const glob = require('glob');
const path = require('path');

const message = 'select the module to be compiled: '

const files = glob.sync(path.join(__dirname, '../packages/*/')).map(files => {
  return path.basename(files);
});

return inquirer.prompt({
  type: 'list',
  message,
  name: 'moduleName',
  choices: files
}).then(({ moduleName }) => {
  return spawn('node', [
    '--max-old-space-size=4096',
    path.join(__dirname, 'compiler'),
    moduleName
  ], {
    cwd: path.join(__dirname, '../'),
    stdio: 'inherit'
  });
});

