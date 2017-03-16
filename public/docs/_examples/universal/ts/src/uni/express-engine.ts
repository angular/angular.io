// hacky express wrapper thingy.

const fs = require('fs');
import { renderModuleFactory } from '@angular/platform-server';

const templateCache = {};
const outputCache = {};

export function ngExpressEngine(setupOptions: any) {

  return function (filePath: any, options: any, callback: any) {
    let url: string = options.req.url;
    let html: string = outputCache[url];
    if (html) {
      // already built page for this url
      console.log('from cache: ' + url);
      callback(null, html);
      return;
    }

    console.log('building: ' + url);
    if (!templateCache[filePath]) {
      let file = fs.readFileSync(filePath);
      templateCache[filePath] = file.toString();
    }
    // render the page via angular platform-server
    renderModuleFactory(setupOptions.bootstrap[0], {
      document: templateCache[filePath],
      url: options.req.url
    }).then(str => {
      outputCache[url] = str;
      callback(null, str);
    });
  };
}
