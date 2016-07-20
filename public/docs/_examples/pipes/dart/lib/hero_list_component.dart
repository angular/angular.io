// #docregion
import 'package:angular2/angular2.dart';

import 'fetch_json_pipe.dart';

@Component(
    selector: 'hero-list',
    // #docregion template
    template: '''
      <h4>Heroes from JSON File</h4>

      <div *ngFor="let hero of ('heroes.json' | fetch) ">
        {{hero['name']}}
      </div>

      <p>Heroes as JSON:
      {{'heroes.json' | fetch | json}}
      </p>
    ''',
    pipes: const [FetchJsonPipe])
class HeroListComponent {}
