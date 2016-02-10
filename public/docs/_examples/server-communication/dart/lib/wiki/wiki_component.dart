// #docregion
import 'package:angular2/angular2.dart';
import 'wikipedia_service.dart';
import 'dart:async';

@Component(
    selector: 'my-wiki',
    template: '''
    <h1>Wikipedia Demo</h1>
    <p><i>Fetches after each keystroke</i></p>
    <input #term (keyup)="search(term.value)"/>
    <ul>
      <li *ngFor="#item of items">{{item}}</li>
    </ul>
    ''',
    providers: const [WikipediaService])
class WikiComponent {
  WikipediaService _wikipediaService;
  List items;

  WikiComponent(this._wikipediaService);

  search(String term) async {
    items = await this._wikipediaService.search(term);
  }
}
