// #docregion
import 'package:angular2/bootstrap.dart';
import 'package:angular2/core.dart';

@Component(selector: 'my-app', template: '<h1>My First Angular 2 App</h1>')
class AppComponent {}

main() {
  bootstrap(AppComponent);
}
