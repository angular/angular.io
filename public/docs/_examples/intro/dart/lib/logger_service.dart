library developer_guide_intro.logger_service;

import 'dart:html';

import 'package:angular2/angular2.dart';

@Injectable()
class Logger {
  void log(dynamic msg) {
    window.console.log(msg);
  }

  void error(dynamic msg) {
    window.console.error(msg);
  }

  void warn(dynamic msg) {
    window.console.warn(msg);
  }
}
