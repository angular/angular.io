// #docregion
(function(global) {

// Use global packagePath if defined
var pkgPath =  global.packagePath || '../node_modules/'; // path to packages
System.config({
  map: {
    'rxjs':                       pkgPath + 'rxjs',
    '@angular':                   pkgPath + '@angular'
  },
  packages: {
    'js':                                { defaultExtension: 'js' },

    '@angular/common':                   { main: 'index.js', defaultExtension: 'js' },
    '@angular/compiler':                 { main: 'index.js', defaultExtension: 'js' },
    '@angular/core':                     { main: 'index.js', defaultExtension: 'js' },
    '@angular/http':                     { main: 'index.js', defaultExtension: 'js' },
    '@angular/platform-browser':         { main: 'index.js', defaultExtension: 'js' },
    '@angular/platform-browser-dynamic': { main: 'index.js', defaultExtension: 'js' },
    '@angular/router':                   { main: 'index.js', defaultExtension: 'js' },
    '@angular/router-deprecated':        { main: 'index.js', defaultExtension: 'js' },
    '@angular/upgrade':                  { main: 'index.js', defaultExtension: 'js' },
    'rxjs':                              { defaultExtension: 'js' }

  }
});


})(this);
