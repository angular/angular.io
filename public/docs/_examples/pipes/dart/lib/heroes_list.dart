library pipe_examples.heroes_list;

import 'package:angular2/angular2.dart';
import 'package:pipe_examples/fetch_json_pipe.dart';

@Component(selector: 'heroes-list')
@View(
    template: '''
<p>Heroes: {{'heroes.json' | fetch | json}}</p>
''',
    pipes: const [FetchJsonPipe])
class HeroesList {}
