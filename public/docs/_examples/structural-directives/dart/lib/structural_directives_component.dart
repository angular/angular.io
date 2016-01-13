// #docplaster
// #docregion
import 'package:angular2/angular2.dart';
import 'unless_directive.dart';
import 'heavy_loader_component.dart';

@Component(
    selector: 'structural-directives',
    templateUrl: 'structural-directives.component.html',
    styles: const ['button { min-width: 100px; }'],
    directives: const [UnlessDirective, HeavyLoaderComponent])
class StructuralDirectivesComponent {
  List<String> heroes = ['Mr. Nice', 'Narco', 'Bombasto'];
  bool condition = true;
  bool isVisible = true;
  List<String> logs = [];
  String status = 'ready';

  get hero => heroes.elementAt(0);
}
//#enddocregion
