// #docregion
import {bootstrap, Component} from 'angular2/angular2';
import {JSONP_PROVIDERS} from 'angular2/http';
import {WikipediaService} from './wikipedia-service';


@Component({
  selector: 'app',
  template: `
    <h1>Wikipedia Demo</h1>
    <input #term (keyup)="search(term.value)"/>
    <ul>
      <li *ng-for="#item of items">{{item}}</li>
    </ul>
  `
})
class AppComponent {
  items: Array<string>;
  constructor (private wikipediaService: WikipediaService) {}

  search (term: string) {
    this.wikipediaService.search(term).subscribe(items => this.items = items);
  }

}
// #docregion bootstrap
bootstrap(AppComponent, [JSONP_PROVIDERS, WikipediaService]);
// #enddocregion bootstrap
// #enddocregion
