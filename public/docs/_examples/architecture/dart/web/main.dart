// #docregion
import 'package:angular2/bootstrap.dart';
import 'package:developer_guide_intro/backend_service.dart';
import 'package:developer_guide_intro/hero_service.dart';
import 'package:developer_guide_intro/logger_service.dart';
import 'package:developer_guide_intro/hero_list_component.dart';

main() {
  // #docregion bootstrap
  bootstrap(HeroListComponent, [BackendService, HeroService, Logger]);
  // #enddocregion bootstrap
}
