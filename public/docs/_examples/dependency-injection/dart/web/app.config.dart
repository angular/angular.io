//#docregion

// #docregion token
import "package:angular2/core.dart";

const APP_CONFIG = const OpaqueToken("app.config");
// #enddocregion token

//#docregion config
abstract class Config {
  final String apiEndpoint;
  final String title;

  const Config({this.apiEndpoint, this.title});
}

class ConfigImpl implements Config {

  final String apiEndpoint;
  final String title;

  const ConfigImpl({this.apiEndpoint, this.title});
}

const CONFIG = const ConfigImpl(
  apiEndpoint: "api.heroes.com",
  title: "Dependency Injection"
);
//#enddocregion config

//#docregion config-hash
const CONFIG_HASH = const {
  "apiEndpoint": "api.heroes.com",
  "title": "Dependency Injection"
};
//#enddocregion config-hash
