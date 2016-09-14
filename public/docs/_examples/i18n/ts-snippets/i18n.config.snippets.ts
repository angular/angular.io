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
  selector: 'app',
  template: `
    <div>
      {{ messages.length | i18nPlural: messageMapping }}
    </div>
  `,
})
class MyApp {
  messages: any[];
  messageMapping: {[k:string]: string} = {
    '=0': 'No messages.',
    '=1': 'One message.',
    'other': '# messages.'
  }
}
// #enddocregion i18n-plural-pipe

// #docregion i18n-select-pipe
@Component({
  selector: 'app',
  template: `
    <div>
      {{ gender | i18nSelect: inviteMap }}
    </div>
  `,
})
class MyApp {
  gender: string = 'male';
  inviteMap: any = {
    'male': 'Invite him.',
    'female': 'Invite her.',
    'other': 'Invite them.'
  }
}
// #enddocregion i18n-select-pipe

// #docregion tsconfig1
{
  "compilerOptions": {
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "target": "es5",
    "module": "commonjs",
    "outDir": "./dist/out-tsc"
  },
  "files": [
    "./src/main.ts"
  ]
}
// #enddocregion tsconfig1

// #docregion tsconfig2
{
  "compilerOptions": {
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "target": "es5",
    "module": "commonjs",
    "outDir": "./dist/out-tsc"
  },
  "files": [
    "./src/main.ts"
  ],
  "angularCompilerOptions": {
    "genDir": "./src/i18n"
  }
}
// #enddocregion tsconfig2

// #docregion bootstrap
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { AppModule } from './app/';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);
// #enddocregion bootstrap

// #docregion bootstrap-i18n
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode, TRANSLATIONS, TRANSLATIONS_FORMAT, LOCALE_ID } from '@angular/core';
import { environment } from './environments/environment';
import { AppModule } from './app/';
import { TRANSLATION } from './i18n/messages.fr';

if (environment.production) {
  enableProdMode();
}

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
