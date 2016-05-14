// #docregion
(function(global) {

// Use global packagePath if defined
var pkgPath =  global.packagePath || '../node_modules/'; // path to packages
System.config({
  packages: {
    './': { defaultExtension: 'js' },
  }
});

})(this);
