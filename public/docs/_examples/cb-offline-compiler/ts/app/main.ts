// #docregion
import { ReflectiveInjector, coreBootstrap }      from '@angular/core';
import { BROWSER_APP_PROVIDERS, browserPlatform } from '@angular/platform-browser';

import { AppComponentNgFactory } from './app.component.ngfactory';

const appInjector = ReflectiveInjector.resolveAndCreate([BROWSER_APP_PROVIDERS], browserPlatform().injector);

coreBootstrap(AppComponentNgFactory, appInjector);
