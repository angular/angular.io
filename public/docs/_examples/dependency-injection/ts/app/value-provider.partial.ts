//#docregion
//#docregion config
let config = {
  apiEndpoint: 'api.heroes.com',
  title: 'The Hero Employment Agency'
};
//#enddocregion config


//#docregion bootstrap
bootstrap(AppComponent, [
  // other providers //
  provide('App.config', {useValue:config})
]);
//#enddocregion bootstrap
//#enddocregion
