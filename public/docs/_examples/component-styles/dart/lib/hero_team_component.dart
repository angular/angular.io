import 'package:angular2/core.dart';
import 'hero.dart';

// #docregion stylelink
@Component(
    selector: 'hero-team',
    template: '''
      <link rel="stylesheet" href="hero_team_component.css">
      <h3>Team</h3>
      <ul>
        <li *ngFor="let member of hero.team">
          {{member}}
        </li>
      </ul>''')
class HeroTeamComponent {
  @Input() Hero hero;
}
