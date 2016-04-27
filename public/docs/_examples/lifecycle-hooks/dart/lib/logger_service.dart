import 'dart:async';

import 'package:angular2/core.dart';

@Injectable()
class LoggerService {
  List<String> logs = [];

  int prevMsgCount;

  String prevMsg;

  log(String msg) {
    if (msg == prevMsg) {
      // Repeat message; update last log entry with count.
      logs[logs.length - 1] = msg + ' (${prevMsgCount += 1}x)';
    } else {
      // New message; log it.
      prevMsg = msg;
      prevMsgCount = 1;
      logs.add(msg);
    }
  }

  clear() => logs.clear();

  tick() => new Future(() {});
}
