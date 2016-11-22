// #docregion
// #docregion import
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app.module';
// #enddocregion import

const platform = platformBrowserDynamic();
platform.bootstrapModule(AppModule);
