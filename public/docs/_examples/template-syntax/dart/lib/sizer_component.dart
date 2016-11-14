// #docregion
import 'dart:math';
import 'package:angular2/core.dart';

@Component(
    selector: 'my-sizer',
    template: '''
      <div>
        <button (click)="dec()" title="smaller">-</button>
        <button (click)="inc()" title="bigger">+</button>
        <label [style.font-size.px]="size">FontSize: {{size}}px</label>
      </div>''')
class MySizerComponent {
  static final defaultPxSize = 14;

  @Input()
  String size;

  @Output()
  var sizeChange = new EventEmitter<String>();

  void dec() => resize(-1);
  void inc() => resize(1);

  void resize(num delta) {
    final numSize = num.parse(size, (_) => defaultPxSize);
    size = min(40, max(8, numSize + delta)).toString();
    sizeChange.emit(size);
  }
}
