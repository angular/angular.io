// #docregion
import 'package:angular2/core.dart';

@Injectable()
class Logger {
  List<String> _logs = [];
  List<String> get logs => _logs;

  void log(String message) {
    _logs.add(message);
    print(message);
  }
}
