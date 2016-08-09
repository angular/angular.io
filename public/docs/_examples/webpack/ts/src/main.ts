// #docregion
import { browserDynamicPlatform } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';

import { AppModule } from './app/app.module';

// #docregion enable-prod
if (process.env.ENV === 'production') {
  enableProdMode();
}
// #enddocregion enable-prod

browserDynamicPlatform().bootstrapModule(AppModule);
// #enddocregion
