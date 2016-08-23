import { browserDynamicPlatform } from '@angular/platform-browser-dynamic';

import { AppModule } from './app.module';

browserDynamicPlatform().bootstrapModule(AppModule);
