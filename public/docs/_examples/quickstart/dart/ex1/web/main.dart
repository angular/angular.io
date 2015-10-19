// #docregion
import 'package:angular2/angular2.dart';
import 'package:angular2/bootstrap.dart';

@Component(selector: 'my-app', template: '<h1>My First Angular 2 App</h1>')
class AppComponent {}

main() {
  bootstrap(AppComponent);
}
