// #docregion
import {Title, bootstrap} from 'angular2/platform/browser';
import {ROUTER_PROVIDERS} from 'angular2/router';
import {AppComponent} from './app.component';

bootstrap(AppComponent, [
  Title,
  ROUTER_PROVIDERS
]);
