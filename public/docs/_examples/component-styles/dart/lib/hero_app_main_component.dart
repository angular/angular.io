import 'package:angular2/core.dart';

import 'hero.dart';
import 'hero_details_component.dart';
import 'hero_controls_component.dart';
import 'quest_summary_component.dart';

@Component(
    selector: 'hero-app-main',
    template: '''
      <quest-summary></quest-summary>
      <hero-details [hero]="hero" [class.active]="hero.active">
        <hero-controls [hero]="hero"></hero-controls>
      </hero-details>''',
    directives: const [
      HeroDetailsComponent,
      HeroControlsComponent,
      QuestSummaryComponent
    ])
class HeroAppMainComponent {
  @Input() Hero hero;
}
