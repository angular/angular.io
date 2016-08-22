// #docregion
import 'package:angular2/core.dart';
import 'package:stream_transformers/stream_transformers.dart';

import 'wikipedia_service.dart';

@Component(
    selector: 'my-wiki-smart',
    template: '''
      <h1>Smarter Wikipedia Demo</h1>
      <p><i>Fetches when typing stops</i></p>

      <input #term (keyup)="search(term.value)"/>
      <ul>
        <li *ngFor="let item of items">{{item}}</li>
      </ul>
    ''',
    providers: const [WikipediaService])
class WikiSmartComponent {
  final WikipediaService _wikipediaService;
  List items = [];

  WikiSmartComponent(this._wikipediaService) {
    _searchTermStream
        .transform(new Debounce(new Duration(milliseconds: 300)))
        .distinct()
        .transform(new FlatMapLatest(
            (term) => _wikipediaService.search(term).asStream()))
        .forEach((data) {
      items = data;
    });
  }

  final EventEmitter _searchTermStream = new EventEmitter();

  void search(String term) => _searchTermStream.add(term);
}
