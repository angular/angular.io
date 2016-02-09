import 'package:angular2/angular2.dart';
import 'exponential_strength_pipe.dart';

@Component(
    selector: 'power-boost-calculator',
    template: '''
<h2>Power Boost Calculator</h2>
<div>Normal power: <input [(ngModel)]="power" /></div>
<div>Boost factor: <input [(ngModel)]="factor" /></div>
<p>
  Super Hero Power: {{power | exponentialStrength: factor}}
</p>
''',
    pipes: const [ExponentialStrengthPipe],
    directives: const [COMMON_DIRECTIVES])
class PowerBoostCalculator {
  int power = 5;
  int factor = 1;
}
