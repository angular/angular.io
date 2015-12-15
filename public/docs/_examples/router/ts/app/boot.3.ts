// #docregion
import {bootstrap}        from 'angular2/platform/browser';
import {ROUTER_PROVIDERS} from 'angular2/router';

import {AppComponent}     from './app.component.3';
import {DialogService}    from './dialog.service';

bootstrap(AppComponent, [
  ROUTER_PROVIDERS,
  DialogService
]);
