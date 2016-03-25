// #docregion
// #docregion token
import 'package:angular2/core.dart';

const appConfig = const OpaqueToken('app.config');
// #enddocregion token

//#docregion config
const config1 = const <String, String>{
  'apiEndpoint': 'api.heroes.com',
  'title': 'Dependency Injection'
};
//#enddocregion config
