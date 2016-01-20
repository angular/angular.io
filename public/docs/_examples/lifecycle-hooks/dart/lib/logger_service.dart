import 'package:angular2/angular2.dart';
import 'dart:async';

@Injectable()
class LoggerService {
  List<String> logs = [];

  log(String msg, [bool noTick = false]) {
    if (!noTick) {
      tick();
    }
    logs.add(msg);
  }

  clear() => logs.clear();

  tick() => new Future(() {});
}
