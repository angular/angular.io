/* tslint:disable */
import { bootstrap } from '@angular/platform-browser-dynamic';

import { AppCtorComponent } from './app-ctor.component';
import { AppComponent as v1 } from './app.component.1';
import { AppComponent as v2 } from './app.component.2';
import { AppComponent as v3 } from './app.component.3';

import { AppComponent as final } from './app.component';

// pick one
// bootstrap(v1);
// bootstrap(v2);
// bootstrap(v3);
bootstrap(final);

// for doc testing
bootstrap(AppCtorComponent);
