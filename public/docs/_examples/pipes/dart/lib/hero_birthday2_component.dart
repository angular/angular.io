import 'package:angular2/angular2.dart';

@Component(
    selector: 'hero-birthday',
    template: '''
      <p>The hero's birthday is {{ birthday | date:format }}</p>
      <button (click)="toggleFormat()">Toggle Format</button>
    ''')
class HeroBirthday {
  DateTime birthday = new DateTime(1988, 4, 15); // April 15, 1988

  bool toggle = true;

  get format => toggle ? 'shortDate' : 'fullDate';

  void toggleFormat() {
    toggle = !toggle;
  }
}
