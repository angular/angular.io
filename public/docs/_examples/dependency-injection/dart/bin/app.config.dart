//#docregion

// #docregion token
import "package:angular2/core.dart";

const APP_CONFIG = const OpaqueToken("app.config");
// #enddocregion token

//#docregion config
class Config {
  final String apiEndpoint;
  final String title;

  const Config({this.apiEndpoint, this.title});
}

const Config CONFIG =  const Config(
  apiEndpoint: "api.heroes.com",
  title: "Dependency Injection"
);
//#enddocregion config
