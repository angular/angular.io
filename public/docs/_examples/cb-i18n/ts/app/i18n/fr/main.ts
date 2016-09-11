// #docplaster
// #docregion
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { TRANSLATIONS, TRANSLATIONS_FORMAT, LOCALE_ID } from '@angular/core';

import { AppModule }    from '../../app.module';
// #docregion translation-import
import { translations } from './messages.fr';
// #enddocregion translation-import

// #enddocregion
/*
  // Webpack users don't need to create
  // They simply define `translations` here and let webpack load it:
// #docregion webpack
  const translations = require("raw!./cb-i18n/messages.fr.xlf");
// #enddocregion webpack
*/

// #docregion
// Compile using french translations
const platform = platformBrowserDynamic();

platform.bootstrapModule(
  AppModule,
  {
    providers: [
      {provide: TRANSLATIONS, useValue: translations},
      {provide: TRANSLATIONS_FORMAT, useValue: 'xlf'},
      {provide: LOCALE_ID, useValue: 'fr'}
    ]
  }
);
