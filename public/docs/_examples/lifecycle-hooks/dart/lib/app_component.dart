// #docregion
import 'package:angular2/core.dart';

import 'after_content_parent.dart';
import 'after_view_component.dart';
import 'counter_component.dart';
import 'on_changes_component.dart';
import 'peek_a_boo_parent_component.dart';
import 'spy_component.dart';

@Component(
    selector: 'my-app',
    template: '''
    <peek-a-boo-parent></peek-a-boo-parent>
    <on-changes-parent></on-changes-parent>
    <after-view-parent></after-view-parent>
    <after-content-parent></after-content-parent>
    <spy-parent></spy-parent>
    <counter-parent></counter-parent>
    ''',
    directives: const [
      PeekABooParentComponent,
      OnChangesParentComponent,
      AfterViewParentComponent,
      AfterContentParentComponent,
      SpyParentComponent,
      CounterParentComponent
    ])
class AppComponent {}
