import {bootstrap} from 'angular2/angular2';
import {AppCtorComponent} from './app-ctor';
import {AppComponent as v1} from './app.1';
import {AppComponent as v2} from './app.2';
import {AppComponent as v3} from './app.3';

import {AppComponent as final} from './app.final';

// pick one
//bootstrap(v1);
//bootstrap(v2);
//bootstrap(v3);
bootstrap(final);

// for doc testing
bootstrap(AppCtorComponent);