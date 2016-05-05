// #docregion

import 'package:angular2/core.dart';
import 'package:stream_transformers/stream_transformers.dart';

import 'wikipedia_service.dart';
import 'package:jsonpadding/jsonpadding.dart';

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
  providers: const [Jsonp, WikipediaService])
class WikiSmartComponent {
  final WikipediaService _wikipediaService;
  List items = [];

  WikiSmartComponent(this._wikipediaService) {
    // #docregion observable-operators
    _searchTermStream
      .transform(new Debounce(const Duration(milliseconds: 300)))
      .distinct()
      .transform(new FlatMapLatest((term) => _wikipediaService.search(term).asStream()))
      .forEach((data) {
        items = data;
      });
// #enddocregion observable-operators
  }

  // #docregion subject
  final EventEmitter _searchTermStream = new EventEmitter<String>();

  void search(String term) => _searchTermStream.add(term);
// #enddocregion subject
}
