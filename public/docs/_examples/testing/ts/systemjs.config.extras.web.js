/**
 * Web (plunker) version of systemjs.config.extras.js
 * It should default to `.ts` extensions rather than `.js` extensions in almost all cases.
 */
System.config({
  packages: {
    // barrels
    'app/model': {main:'index.ts', defaultExtension:'ts'},
    'app/model/testing': {main:'index.ts', defaultExtension:'ts'}
  }
});
