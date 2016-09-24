// #docregion
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { TRANSLATIONS, TRANSLATIONS_FORMAT, LOCALE_ID } from '@angular/core';

import { AppModule } from './app.module';
import { TRANSLATION } from './i18n/messages.fr';

// Compile using french translations
const platform = platformBrowserDynamic();
platform.bootstrapModule(
  AppModule,
  {
    providers: [
      {provide: TRANSLATIONS, useValue: TRANSLATION},
      {provide: TRANSLATIONS_FORMAT, useValue: 'xlf'},
      {provide: LOCALE_ID, useValue: 'fr'}
    ]
  }
);
