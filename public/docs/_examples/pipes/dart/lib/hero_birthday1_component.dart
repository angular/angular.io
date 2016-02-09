import 'package:angular2/angular2.dart';

@Component(
    selector: 'hero-birthday',
    template: '''
      <p>The hero's birthday is {{ birthday | date }}</p>
    ''')
class HeroBirthday {
  DateTime birthday = new DateTime(1988, 4, 15); // April 15, 1988
}
