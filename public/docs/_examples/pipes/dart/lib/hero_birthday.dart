library pipe_examples.hero_birthday;

import 'package:angular2/angular2.dart';

@Component(selector: 'hero-birthday')
@View(
    template: '''
<p>The hero's birthday is {{ birthday | date:format }}</p>
<button (click)="toggleFormat()">Toggle Format</button>
''')
class HeroBirthday {
  DateTime birthday = new DateTime(1988, 4, 15); // April 15, 1988
  String format = 'shortDate';
  String nextFormat = 'fullDate';

  toggleFormat() {
    var next = this.format;
    format = this.nextFormat;
    nextFormat = next;
  }
}
