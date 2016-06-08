import 'package:angular2/core.dart';
import 'hero.dart';

// #docregion inlinestyles
@Component(
    selector: 'hero-controls',
    template: '''
      <style>
        button {
          background-color: white;
          border: 1px solid #777;
        }
      </style>
      <h3>Controls</h3>
      <button (click)="activate()">Activate</button>''')
class HeroControlsComponent {
  @Input()
  Hero hero;

  void activate() {
    hero.active = true;
  }
}
