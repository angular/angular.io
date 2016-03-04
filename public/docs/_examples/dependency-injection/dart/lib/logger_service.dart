// #docregion
import 'package:angular2/angular2.dart';

@Injectable()
class Logger {
  List<String> logs = [];

  void log(String message) {
    logs.add(message);
    print(message);
  }
}
