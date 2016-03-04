// #docregion
import 'package:angular2/core.dart';

@Injectable()
class Logger {
  List<String> logs = [];

  void log(String message) {
    logs.add(message);
    print(message);
  }
}
