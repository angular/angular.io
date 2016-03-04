// #docregion
import 'dart:html';

import 'package:angular2/core.dart';

/// A service for logging messages of various types.
///
/// We could switch this implementation to use package:logging.
@Injectable()
class Logger {
  void log(Object msg) => window.console.log(msg);

  void error(Object msg) => window.console.error(msg);

  void warn(Object msg) => window.console.warn(msg);
}
