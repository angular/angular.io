import {bootstrap} from 'angular2/platform/browser';
import {App} from './app.component';

bootstrap(App, [])
  .catch(err => console.error(err));