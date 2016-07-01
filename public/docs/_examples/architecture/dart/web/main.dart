// #docregion
import 'package:angular2/platform/browser.dart';
// #docregion import
import 'package:developer_guide_intro/app_component.dart';
// #enddocregion import
import 'package:developer_guide_intro/backend_service.dart';
import 'package:developer_guide_intro/hero_service.dart';
import 'package:developer_guide_intro/logger_service.dart';

void main() {
  // #docregion bootstrap
  bootstrap(AppComponent, [BackendService, HeroService, Logger]);
  // #enddocregion bootstrap
}
