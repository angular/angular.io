import {bootstrap}    from 'angular2/platform/browser';
import {AppComponent} from './app.component';

bootstrap(AppComponent, [])
  .catch((err:any) => console.error(err));
