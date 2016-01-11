declare var angular:any;

angular.module('heroApp', [])
  .run(() => console.log('running'));

// #docregion bootstrap
angular.bootstrap(document.body, ['heroApp'], {strictDi: true});
// #enddocregion bootstrap
