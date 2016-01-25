// #docregion
library attribute_directives.app_component;

import 'package:angular2/angular2.dart';
import 'package:attribute_directives/highlight_directive.dart';

@Component(
    selector: 'my-app',
    templateUrl: 'app_component.html',
    directives: const [Highlight])
class AppComponent {
  String color;
}
