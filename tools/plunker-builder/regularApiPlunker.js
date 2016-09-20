var PlunkerBuilder = require('./builder');

const rootFiles = [
  'index.html',
  'README.md',
  'systemjs.config.js',
  'tsconfig.json'
];

function buildPlunkers(basePath, destPath, options) {
  configureBuilder(options);
  var builder = new PlunkerBuilder(basePath, destPath, options);
  builder.buildPlunkers();
}

function configureBuilder(options) {
  options.addField = addField;
  options.api = true;
  options.embedded = false;
  options.flagFile = 'module.ts';
  options.plunkerFileName = 'plnkr';
  options.url = 'http://plnkr.co/edit/?p=preview';
  options.writeNoLink = false;
}

function addField(postData, name, content) {
  if (rootFiles.indexOf(name) === -1) {
    name = `app/${name}`;
  }
  postData[`files[${name}]`] = content;
}

module.exports = {
  buildPlunkers: buildPlunkers
};
