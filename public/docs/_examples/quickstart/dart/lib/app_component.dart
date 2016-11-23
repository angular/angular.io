// #docregion
import 'package:angular2/core.dart';

@Component(
    selector: 'my-app',
    template: '<h1>Hello {{name}}</h1>')
class AppComponent {
  var name = 'Angular';
}
