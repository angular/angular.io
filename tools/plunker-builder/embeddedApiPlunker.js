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
  options.embedded = true;
  options.extraData = extraData;
  options.flagFile = 'module.ts';
  options.plunkerFileName = 'eplnkr';
  options.url = 'https://embed.plnkr.co?show=preview';
  options.writeNoLink = false;
}

function extraData(postData, config) {
  postData['source[type]'] = config.description || 'Angular 2 example';
  postData['source[url]'] = 'https://angular.io'
}

function addField(postData, name, content) {
  var encoding = 'utf8';
  if (name.split('.').pop === 'png') {
    encoding = 'base64';
  }
  if (rootFiles.indexOf(name) === -1) {
    name = `app/${name}`;
  }
  postData[`entries[${name}][content]`] = content;
  postData[`entries[${name}][encoding]`] = encoding;
}

module.exports = {
  buildPlunkers: buildPlunkers
};
