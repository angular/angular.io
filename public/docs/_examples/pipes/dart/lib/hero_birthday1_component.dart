// #docregion
import 'package:angular2/angular2.dart';

@Component(
    selector: 'hero-birthday',
    // #docregion hero-birthday-template
    template: "<p>The hero's birthday is {{ birthday | date }}</p>"
    // #enddocregion hero-birthday-template
    )
class HeroBirthdayComponent {
  DateTime birthday = new DateTime(1988, 4, 15); // April 15, 1988
}
