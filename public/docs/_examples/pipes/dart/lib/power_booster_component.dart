// #docregion
import 'package:angular2/angular2.dart';
import 'exponential_strength_pipe.dart';

@Component(
    selector: 'power-booster',
    template: '''
      <h2>Power Booster</h2>
      <p>Super power boost: {{2 | exponentialStrength: 10}}</p>
    ''',
    pipes: const [ExponentialStrengthPipe])
class PowerBoosterComponent {}
