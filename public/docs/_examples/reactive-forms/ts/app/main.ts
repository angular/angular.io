// tslint:disable:no-unused-variable
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule }  from './app.module';  // just the final version
import { DemoModule } from './demo.module'; // demo picker

platformBrowserDynamic().bootstrapModule(DemoModule); // (AppModule);
