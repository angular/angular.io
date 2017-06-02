// #docregion
library developer_guide_intro.logger_service;

import 'dart:html';

import 'package:angular2/angular2.dart';

@Injectable()
class Logger {
  void log(Object msg) => window.console.log(msg);

  void error(Object msg) => window.console.error(msg);

  void warn(Object msg) => window.console.warn(msg);
}
