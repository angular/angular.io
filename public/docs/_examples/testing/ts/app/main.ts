import { bootstrap }      from 'angular2/platform/browser';
import { AppComponent }   from './app.component';
import { MyIfParentComp } from './bag';

bootstrap(AppComponent);
bootstrap(MyIfParentComp);
