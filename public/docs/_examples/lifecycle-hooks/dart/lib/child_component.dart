// #docregion
import 'package:angular2/core.dart';

@Component(
    selector: 'my-child',
    template: '''
    <div class="my-child">
      <div>-- child view begins --</div>
      <div class="child">{{hero}} is my hero.</div>
      <div>-- child view ends --</div>
    </div>
    ''',
    styles: const [
      '.child {background: Yellow; padding: 8px; }',
      '.my-child {background: LightYellow; padding: 8px; margin-top: 8px}'
    ])
class ChildComponent {
  @Input() String hero;
}
