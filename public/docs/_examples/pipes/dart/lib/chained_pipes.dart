library pipe_examples.chained_pipes;

import 'package:angular2/angular2.dart';

@Component(selector: 'chained-pipes')
@View(
    template: '''
<p>
  The chained hero's birthday is
  {{ birthday | date | uppercase}}
</p>
The chained hero's birthday is
  {{ birthday | date:'fullDate' }}
</p>
<p>
  The chained hero's birthday is
  {{ ( birthday | date:'fullDate' ) | uppercase}}
</p>
''')
class ChainedPipes {
  DateTime birthday = new DateTime(1988, 4, 15); // April 15, 1988
}
