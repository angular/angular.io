// #docregion
import 'package:angular2/angular2.dart';

import 'highlight_directive.dart';

@Component(
    selector: 'my-app',
    templateUrl: 'app_component.html',
    directives: const [Highlight])
class AppComponent {
  String color;
}
