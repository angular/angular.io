// #docplaster
// #docregion
import 'package:angular2/core.dart';

import 'heavy_loader_component.dart';
import 'unless_directive.dart';

@Component(
    selector: 'structural-directives',
    templateUrl: 'structural_directives_component.html',
    styles: const ['button { min-width: 100px; }'],
    directives: const [UnlessDirective, HeavyLoaderComponent])
class StructuralDirectivesComponent {
  List<String> heroes = ['Mr. Nice', 'Narco', 'Bombasto'];
  bool condition = true;
  bool isVisible = true;
  List<String> logs = [];
  String status = 'ready';

  get hero => heroes[0];
}
