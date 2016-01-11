library pipe_examples.power_booster;

import 'package:angular2/angular2.dart';
import 'package:pipe_examples/exponential_strength_pipe.dart';

@Component(selector: 'power-booster')
@View(
    template: '''
<p>Super power boost: {{2 | exponentialStrength: 10}}</p>
''',
    pipes: const [ExponentialStrengthPipe])
class PowerBooster {}
