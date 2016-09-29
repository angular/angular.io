// #docregion
import { TRANSLATIONS, TRANSLATIONS_FORMAT, LOCALE_ID } from '@angular/core';

export function getTranslationProviders(): Promise<Object[]> {

  // Get the locale id from the global
  const locale = document['locale'] as string;

  // return no providers if fail to get translation file for locale
  const noProviders: Object[] = [];

  // No locale or English: no translation providers
  if (!locale || locale === 'en') {
    return Promise.resolve(noProviders);
  }

  // Ex: 'i18n/fr/messages.fr.xlf`
  const translationFile = `./i18n/${locale}/messages.${locale}.xlf`;

  return getTranslationsWithSystemJs(translationFile)
    .then( (translations: string ) => [
      { provide: TRANSLATIONS, useValue: translations },
      { provide: TRANSLATIONS_FORMAT, useValue: 'xlf' },
      { provide: LOCALE_ID, useValue: locale }
    ])
    .catch(() => noProviders); // ignore if file not found
}

declare var System: any;

function getTranslationsWithSystemJs(file: string) {
  return System.import(file + '!text'); // relies on text plugin
}
