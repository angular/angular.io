import 'zone.js/dist/zone-node';
import { enableProdMode } from '@angular/core';
// import { AppServerModule } from './app.server';
import { AppServerModuleNgFactory } from '../../ngfactory/src/uni/app.server.ngfactory';
import * as express from 'express';
import {ngExpressEngine} from './express-engine';

enableProdMode();

const app = express();

// set our angular engine as the handler for html files.  (there is actually only one html file.)
app.engine('html', ngExpressEngine({
    baseUrl: 'http://localhost:3200',
    bootstrap: [AppServerModuleNgFactory]
}));

// set default file extension to html.
app.set('view engine', 'html');
// set default view directory
app.set('views', 'aot');

// handle requests for routes in the app.  ngExpressEngine does the rendering.
app.get(['/', '/dashboard', '/heroes', '/detail/:id'], (req, res) => {
    res.render('index-uni', {req});
});

// handle requests for static files
app.get(['/*.js', '/*.css'], (req, res, next) => {
  let options = { root: 'aot' };
  let fileName = req.originalUrl;
  res.sendFile(fileName, options, function (err) {
    if (err) {
      next(err);
    }
  });
});

app.listen(3200, () => {
    console.log('listening on port 3200...');
});
