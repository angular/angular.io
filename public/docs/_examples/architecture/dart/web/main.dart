// #docregion
import 'package:angular2/platform/browser.dart';

import 'package:developer_guide_intro/backend_service.dart';
import 'package:developer_guide_intro/hero_list_component.dart';
import 'package:developer_guide_intro/hero_service.dart';
import 'package:developer_guide_intro/logger_service.dart';

main() {
  // #docregion bootstrap
  bootstrap(HeroListComponent, [BackendService, HeroService, Logger]);
  // #enddocregion bootstrap
}
