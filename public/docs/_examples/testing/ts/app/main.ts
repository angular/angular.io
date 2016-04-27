import { bootstrap }      from '@angular/platform-browser-dynamic';
import { AppComponent }   from './app.component';
import { MyIfParentComp } from './bag';

bootstrap(AppComponent);
bootstrap(MyIfParentComp);
