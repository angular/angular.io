import { browserDynamicPlatform } from '@angular/platform-browser-dynamic';
import { AppModule }           from './app.module';

// #docregion bootstrap
browserDynamicPlatform().bootstrapModule(AppModule);
// #enddocregion bootstrap
