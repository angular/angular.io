// #docregion
function publish() {
  var inlineResources = require('./inline-resources');

  // AoT compile
  var spawnNgc = require( 'child_process' ).spawnSync;
  var ngc = spawnNgc('./public/docs/_examples/node_modules/.bin/ngc', ['-p', './public/docs/_examples/cb-third-party-lib/hero-profile/tsconfig-aot.json']);

  // Copy to node_modules
  var fs = require('fs');
  var del = require('del');

  var node_modules_root = './public/docs/_examples/node_modules/hero-profile/';

  del.sync(node_modules_root, {force:true});

  fs.mkdirSync(node_modules_root);
  fs.mkdirSync(node_modules_root + 'bundles');

  var aotFiles = [
    'hero-profile.component.html',
    'hero-profile.component.css',
    
    'hero-profile.component.d.ts',
    'hero-profile.module.d.ts',
    'hero.d.ts',
    'index.d.ts',

    'hero-profile.component.js',
    'hero-profile.module.js',
    'hero.js',
    'index.js',

    'index.metadata.json',
    'hero-profile.module.metadata.json',
    'hero-profile.component.metadata.json',

    'package.json'
  ]

  aotFiles.map(function(f) {
    var path = f.split('/');
    var release = node_modules_root + path[path.length-1];
    fs.createReadStream('./public/docs/_examples/cb-third-party-lib/hero-profile/' + f).pipe(fs.createWriteStream(release));
  });

  return inlineResources('./public/docs/_examples/cb-third-party-lib/hero-profile/hero-profile.component.*').then(function(){

    // Create umd bundle
    var spawnRollup = require( 'child_process' ).spawnSync;
    var rollup = spawnRollup('./public/docs/_examples/node_modules/.bin/rollup', ['-c', './public/docs/_examples/cb-third-party-lib/hero-profile/rollup-config.js']);

    var umd = './public/docs/_examples/cb-third-party-lib/hero-profile/bundles/hero-profile.umd.js';
    fs.createReadStream(umd).pipe(fs.createWriteStream(node_modules_root + 'bundles/hero-profile.umd.js'));

  });
}

module.exports = publish;
