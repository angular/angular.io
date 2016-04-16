// #docregion pre-bootstrap
import core from './core/core.module';
import phoneList from './phone-list/phone-list.module';
import phoneDetail from './phone-detail/phone-detail.module';
import appConfig from './app.config';

angular.module('phonecatApp', [
  'ngAnimate',
  'ngRoute',
  core.name,
  phoneList.name,
  phoneDetail.name
]).config(appConfig);

// #enddocregion pre-bootstrap
// #docregion bootstrap
angular.bootstrap(document.documentElement, ['phonecatApp']);
// #enddocregion bootstrap
