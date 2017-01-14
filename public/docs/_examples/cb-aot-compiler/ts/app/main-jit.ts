// #docregion
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule }              from './app.module';

console.log('Running JIT compiled');
platformBrowserDynamic().bootstrapModule(AppModule);
