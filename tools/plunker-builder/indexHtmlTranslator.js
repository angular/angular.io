module.exports = {
  translate: translate
};

var _rxRules = {
  basehref: {
    from: /<base href=".*"[/]?>/,
    to: '<script>document.write(\'<base href="\' + document.location + \'" />\');</script>'
  },
  script: {
    from: /<script.*".*%tag%".*>.*<\/script>/,
    to: '<script src="%tag%"></script>'
  },
  link: {
    from: '/<link rel="stylesheet" href=".*%tag%".*>/',
    to: '<link rel="stylesheet" href="%tag%">'
  },
  config: {
    from: /\s*System.config\(\{[\s\S]*\}\);/m,
    to: "\n" +
        "      System.config({\n" +
        "        transpiler: 'typescript', \n" +
        "        typescriptOptions: { emitDecoratorMetadata: true }, \n" +
        "        packages: {'app': {defaultExtension: 'ts'}} \n" +
        "      });"
  },

};

var _rxData = [
  {
    pattern: 'basehref',
  },
  {
    pattern: 'script',
    from: 'node_modules/systemjs/dist/system.src.js',
    //to:   ['https://code.angularjs.org/tools/system.js', 'https://code.angularjs.org/tools/typescript.js']
    //to:   ['https://code.angularjs.org/tools/system.js', 'https://npmcdn.com/typescript@1.8.10/lib/typescript.js']
    to:   ['https://cdnjs.cloudflare.com/ajax/libs/systemjs/0.19.26/system.js', 'https://npmcdn.com/typescript@1.8.10/lib/typescript.js']
  },
  {
    pattern: 'script',
    from: 'node_modules/angular2/bundles/angular2.dev.js',
    to: 'https://code.angularjs.org/2.0.0-beta.15/angular2.dev.js'
  },
  {
    pattern: 'script',
    from: 'node_modules/angular2/bundles/angular2-all.umd.dev.js',
    to: 'https://code.angularjs.org/2.0.0-beta.15/angular2-all.umd.dev.js'
  },
  {
    pattern: 'script',
    from: 'node_modules/angular2/bundles/angular2-all.umd.js',
    to: 'https://code.angularjs.org/2.0.0-beta.15/angular2-all.umd.dev.js'
  },
  {
    pattern: 'script',
    from: 'node_modules/angular2/bundles/angular2-polyfills.js',
    to: 'https://code.angularjs.org/2.0.0-beta.15/angular2-polyfills.js'
  },
  {
    pattern: 'script',
    from: 'node_modules/rxjs/bundles/Rx.js',
    to: 'https://code.angularjs.org/2.0.0-beta.15/Rx.js'
  },
  {
    pattern: 'script',
    from: 'node_modules/rxjs/bundles/Rx.umd.js',
    to: 'https://code.angularjs.org/2.0.0-beta.15/Rx.umd.js'
  },
  {
    pattern: 'script',
    from: 'node_modules/angular2/bundles/router.dev.js',
    to: 'https://code.angularjs.org/2.0.0-beta.15/router.dev.js'
  },
  {
    pattern: 'script',
    from: 'node_modules/angular2/bundles/http.dev.js',
    to: 'https://code.angularjs.org/2.0.0-beta.15/http.dev.js'
  },
  {
    pattern: 'script',
    from: 'node_modules/angular2/bundles/testing.dev.js',
    to: 'https://code.angularjs.org/2.0.0-beta.15/testing.dev.js'
  },
  {
    pattern: 'script',
    from: 'node_modules/angular2/es6/dev/src/testing/shims_for_IE.js',
    to: 'https://npmcdn.com/angular2@2.0.0-beta.15/es6/dev/src/testing/shims_for_IE.js'
  },
  {
    pattern: 'script',
    from: 'node_modules/es6-shim/es6-shim.min.js',
    to: 'https://cdnjs.cloudflare.com/ajax/libs/es6-shim/0.35.0/es6-shim.min.js'
  },
  {
    pattern: 'script',
    from: 'node_modules/systemjs/dist/system-polyfills.js',
    to: 'https://cdnjs.cloudflare.com/ajax/libs/systemjs/0.19.26/system-polyfills.js'
  },
  {
    pattern: 'script',
    from: 'node_modules/a2-in-memory-web-api/web-api.js',
    to: 'https://npmcdn.com/a2-in-memory-web-api/web-api.js'
  },
  {
    pattern: 'link',
    from: 'node_modules/bootstrap/dist/css/bootstrap.min.css',
    to: 'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.6/css/bootstrap.min.css'
  },
  {
    pattern: 'config',
  }
];



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
    html = html.replace(rxFrom, rxTo );
  });

  return html;
}

function rxFromString(rxString) {
  var rx = /^\/(.*)\/(.*)/;
  var pieces = rx.exec(rxString);
  return RegExp(pieces[1], pieces[2]);
}
