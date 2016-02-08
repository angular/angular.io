// #docregion
import {Component}        from 'angular2/core';
import {JSONP_PROVIDERS}  from 'angular2/http';
import {Observable}       from 'rxjs/Observable';

import {WikipediaService} from './wikipedia.service';

@Component({
  selector: 'my-wiki',
  template: `
    <h1>Wikipedia Demo</h1>
    <p><i>Fetches after each keystroke</i></p>

    <input #term (keyup)="search(term.value)"/>
    
    <ul>
      <li *ngFor="#item of items | async">{{item}}</li>
    </ul>
  `,
  providers:[JSONP_PROVIDERS, WikipediaService]
})
export class WikiComponent {

  constructor (private _wikipediaService: WikipediaService) {}

  items: Observable<string[]>;

  search (term: string) {
    this.items = this._wikipediaService.search(term);
  }
}
