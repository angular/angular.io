// #docregion
import 'package:angular2/platform/browser.dart';

import 'package:server_communication/toh/toh_component.dart';
import 'package:server_communication/wiki/wiki_component.dart';
import 'package:server_communication/wiki/wiki_smart_component.dart';

main() {
  bootstrap(TohComponent);
  bootstrap(WikiComponent);
  bootstrap(WikiSmartComponent);
}
