// #docregion
// #docregion token
import 'package:angular2/core.dart';

//#docregion const-class
@Injectable()
class AppConfig {
  final apiEndpoint;
  final String title;

  const AppConfig(this.apiEndpoint, this.title);
}
//#enddocregion const-class

//#docregion const-object
const config1 = const AppConfig('api.heroes.com', 'Dependency Injection');
//#enddocregion const-object
