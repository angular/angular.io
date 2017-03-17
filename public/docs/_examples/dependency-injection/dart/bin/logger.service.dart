// #docregion
import "package:angular2/core.dart";

@Injectable()
class Logger {
  List<String> logs = [];
  log(String message) {
    logs.add(message);
    print(message);
  }
}
