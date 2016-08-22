import 'dart:async';

import 'package:angular2/core.dart';

@Injectable()
class LoggerService {
  List<String> logs = [];
  String _prevMsg = '';
  int _prevMsgCount = 1;

  void log(String msg) {
    if (msg == _prevMsg) {
      // Repeat message; update last log entry with count.
      logs[logs.length - 1] = "$msg (${_prevMsgCount += 1}x)";
    } else {
      // New message; log it.
      _prevMsg = msg;
      _prevMsgCount = 1;
      logs.add(msg);
    }
  }

  void clear() => logs.clear();

  // schedules a view refresh to ensure display catches up
  tick() => new Future(() {});
}
