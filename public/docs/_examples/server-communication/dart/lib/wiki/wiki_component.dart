// #docregion
import 'dart:async';

import 'package:angular2/core.dart';

import 'wikipedia_service.dart';

@Component(
    selector: 'my-wiki',
    template: '''
      <h1>Wikipedia Demo</h1>
      <p><i>Fetches after each keystroke</i></p>
      <input #term (keyup)="search(term.value)"/>
      <ul>
        <li *ngFor="let item of items">{{item}}</li>
      </ul>
    ''',
    providers: const [WikipediaService])
class WikiComponent {
  final WikipediaService _wikipediaService;
  List items = [];

  WikiComponent(this._wikipediaService);

  Future search(String term) async {
    items = await this._wikipediaService.search(term);
  }
}
