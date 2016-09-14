/* tslint:disable */
// #docregion i18n-directive
<h1 i18n>Hello i18n</h1>
// #enddocregion i18n-directive

// #docregion i18n-directive-desc
<h1 i18n="An introduction header for this sample">Hello i18n</h1>
// #enddocregion i18n-directive-desc

// #docregion i18n-directive-meaning
<h1 i18n="User welcome|An introduction header for this sample">Hello i18n</h1>
// #enddocregion i18n-directive-meaning

// #docregion i18n-plural-pipe
@Component({
  selector: 'my-app',
  template: `
    <div>
      {{ messages.length | i18nPlural: messageMapping }}
    </div>
  `
})
export class AppComponent {
  messages: string[];
  messageMapping: {[k:string]: string} = {
    '=0': 'No messages.',
    '=1': 'One message.',
    'other': '# messages.'
  }
}
// #enddocregion i18n-plural-pipe

// #docregion i18n-select-pipe
@Component({
  selector: 'my-app',
  template: `
    <div>
      {{ gender | i18nSelect: genderMap }}
    </div>
  `
})
export class AppComponent {
  gender = 'male';
  genderMap = {
    'male': 'Invite him.',
    'female': 'Invite her.',
    'other': 'Invite them.'
  }
}
// #enddocregion i18n-select-pipe

// #docregion tsconfig
{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",
    "moduleResolution": "node",
    "sourceMap": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "removeComments": false,
    "noImplicitAny": true,
    "suppressImplicitAnyIndexErrors": true
  },
  "angularCompilerOptions": {
    "genDir": "./app/i18n"
  }
}
// #enddocregion tsconfig

// #docregion bootstrap
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app.module';

platformBrowserDynamic().bootstrapModule(AppModule);
// #enddocregion bootstrap

// #docregion bootstrap-i18n
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { TRANSLATIONS, TRANSLATIONS_FORMAT, LOCALE_ID } from '@angular/core';

import { AppModule } from './app.module';
import { TRANSLATION } from './i18n/messages.fr';

// Compile using french translations
platformBrowserDynamic().bootstrapModule(
  AppModule,
  {
    providers: [
      {provide: TRANSLATIONS, useValue: TRANSLATION},
      {provide: TRANSLATIONS_FORMAT, useValue: 'xlf'},
      {provide: LOCALE_ID, useValue: 'fr'}
    ]
  }
);
// #enddocregion bootstrap-i18n

// #docregion messages-ts
export const TRANSLATION = `<?xml version="1.0" encoding="UTF-8"?>
  <xliff xmlns="urn:oasis:names:tc:xliff:document:1.2" version="1.2">
  <file source-language="en" datatype="plaintext" original="ng2.template" target-language="fr-fr">
    ...
  </file>
  </xliff>`;
// #enddocregion messages-ts
