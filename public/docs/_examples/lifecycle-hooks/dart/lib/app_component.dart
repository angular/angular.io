// #docregion
import 'package:angular2/core.dart';

import 'after_content_component.dart';
import 'after_view_component.dart';
import 'counter_component.dart';
import 'do_check_component.dart';
import 'on_changes_component.dart';
import 'peek_a_boo_parent_component.dart';
import 'spy_component.dart';

@Component(
    selector: 'my-app',
    templateUrl: 'app_component.html',
    directives: const [
      AfterContentParentComponent,
      AfterViewParentComponent,
      CounterParentComponent,
      DoCheckParentComponent,
      OnChangesParentComponent,
      PeekABooParentComponent,
      SpyParentComponent,
    ])
class AppComponent {}
