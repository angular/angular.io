module.exports = {
  translate: translate
};

var _rxRules = {
  basehref: {
    from: /<base href=".*"[/]?>/,
    to: '<script>document.write(\'<base href="\' + document.location + \'" />\');</script>'
  },
  angular_pkg: {
    from: /src=".?node_modules\/@angular/g,
    to: 'src="https://unpkg.com/@angular'
  },
  script: {
    from: /<script.*".*%tag%".*>.*<\/script>/,
    to:   '<script src="%tag%"></script>'
  },
  link: {
    from: '/<link rel="stylesheet" href=".*%tag%".*>/',
    to:    '<link rel="stylesheet" href="%tag%">'
  },
  system_extra_main: {
    from: /main:\s*[\'|\"]index.js[\'|\"]/,
    to:   'main: "index.ts"'
  },
  system_extra_defaultExtension: {
    from: /defaultExtension:\s*[\'|\"]js[\'|\"]/,
    to:   'defaultExtension: "ts"'
  },
  zone_pkg: {
    from: /src=".?node_modules\/zone.js\/dist\/(.*)"/g,
    to:   'src="https://unpkg.com/zone.js/dist/$1?main=browser"'
  },
};

var _rxData = [
  {
    pattern: 'basehref',
  },
  {
    pattern: 'script',
    from: 'node_modules/core-js/client/shim.min.js',
    to:   'https://unpkg.com/core-js/client/shim.min.js'
  },
  {
    pattern: 'script',
    from: 'node_modules/zone.js/dist/zone.js',
    to:   'https://unpkg.com/zone.js@0.6.23?main=browser'
  },
  {
    pattern: 'script',
    from: 'node_modules/reflect-metadata/Reflect.js',
    to:   'https://unpkg.com/reflect-metadata@0.1.3'
  },
  {
    pattern: 'script',
    from: 'node_modules/rxjs/bundles/Rx.js',
    to:   'https://unpkg.com/rxjs@5.0.0-beta.12/bundles/Rx.js'
  },
  {
    pattern: 'script',
    from: 'node_modules/systemjs/dist/system.src.js',
    to:   'https://unpkg.com/systemjs@0.19.27/dist/system.src.js'
  },
  {
    pattern: 'script',
    from: 'node_modules/angular/in-memory-web-api/web-api.js',
    to:   'https://unpkg.com/angular/in-memory-web-api/web-api.js'
  },

  // Test libraries

  // Plunker recommends getting jasmine from cloudfare
  {
    pattern: 'script',
    from: 'node_modules/jasmine-core/lib/jasmine-core/jasmine.js',
    to:   'https://cdnjs.cloudflare.com/ajax/libs/jasmine/2.4.1/jasmine.js'
  },
  {
    pattern: 'script',
    from: 'node_modules/jasmine-core/lib/jasmine-core/jasmine-html.js',
    to:   'https://cdnjs.cloudflare.com/ajax/libs/jasmine/2.4.1/jasmine-html.js'
  },
  {
    pattern: 'script',
    from: 'node_modules/jasmine-core/lib/jasmine-core/boot.js',
    to:   'https://cdnjs.cloudflare.com/ajax/libs/jasmine/2.4.1/boot.js'
  },
  {
    pattern: 'link',
    from: 'node_modules/jasmine-core/lib/jasmine-core/jasmine.css',
    to:   'https://cdnjs.cloudflare.com/ajax/libs/jasmine/2.4.1/jasmine.css'
  },


  {
    pattern: 'link',
    from: 'node_modules/bootstrap/dist/css/bootstrap.min.css',
    // Official source per http://getbootstrap.com/getting-started/
    to:   'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css'
  },
  {
    pattern: 'angular_pkg',
  },
  {
    pattern: 'zone_pkg',
  },
  {
    pattern: 'system_extra_main'
  },
  {
    pattern: 'system_extra_defaultExtension'
  }
];


// var first_time = true; // DIAGNOSTIC

function translate(html) {
  _rxData.forEach(function(rxDatum) {
    var rxRule = _rxRules[rxDatum.pattern];
    // rxFrom is a rexexp
    var rxFrom = rxRule.from;
    if (rxDatum.from) {
      var from = rxDatum.from.replace('/', '\/');
      var rxTemp = rxFrom.toString();
      rxTemp = rxTemp.replace('%tag%', from);
      rxFrom = rxFromString(rxTemp);
    }
    // rxTo is a string
    var rxTo = rxRule.to;
    if (rxDatum.to) {
      var to = rxDatum.to;
      to = Array.isArray(to) ? to : [to];
      to = to.map(function (toItem) {
        return rxTo.replace("%tag%", toItem);
      });
      rxTo = to.join("\n    ");
    }

    /* DIAGNOSTIC
    if (first_time && rxDatum.pattern === 'zone_pkg') {
      first_time = false;

      console.log('zone_pkg');
      console.log('  rxFrom: '+rxFrom);
      console.log('  rxTo: '+rxTo);
      console.log('  replace: ' + html.replace(rxFrom, rxTo ));
    }
    */
    html = html.replace(rxFrom, rxTo );
  });

  return html;
}

function rxFromString(rxString) {
  var rx = /^\/(.*)\/(.*)/;
  var pieces = rx.exec(rxString);
  return RegExp(pieces[1], pieces[2]);
}
