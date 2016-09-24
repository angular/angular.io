var PlunkerBuilder = require('./builder');

function buildPlunkers(basePath, destPath, options) {
  configureBuilder(options);
  var builder = new PlunkerBuilder(basePath, destPath, options);
  builder.buildPlunkers();
}

function configureBuilder(options) {
  options.addField = addField;
  options.embedded = false;
  options.flagFile = 'plnkr.json';
  options.plunkerFileName = 'plnkr';
  options.url = 'http://plnkr.co/edit/?p=preview';
  options.writeNoLink = true;
}

function addField(postData, name, content) {
  postData[`files[${name}]`] = content;
}

module.exports = {
  buildPlunkers: buildPlunkers
};
