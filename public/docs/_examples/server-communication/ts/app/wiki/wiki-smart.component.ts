// #docregion
import { Component }        from '@angular/core';
import { JSONP_PROVIDERS }  from '@angular/http';
import { Observable }       from 'rxjs/Observable';
// #docregion import-subject
import { Subject }          from 'rxjs/Subject';
// #enddocregion import-subject

import { WikipediaService } from './wikipedia.service';

@Component({
  selector: 'my-wiki-smart',
  template: `
    <h1>Smarter Wikipedia Demo</h1>
    <p><i>Fetches when typing stops</i></p>

    <input #term (keyup)="search(term.value)"/>

    <ul>
      <li *ngFor="let item of items | async">{{item}}</li>
    </ul>
  `,
  providers: [JSONP_PROVIDERS, WikipediaService]
})
export class WikiSmartComponent {

  constructor (private wikipediaService: WikipediaService) { }

  // #docregion subject
  private searchTermStream = new Subject<string>();

  search(term: string) { this.searchTermStream.next(term); }
  // #enddocregion subject

  // #docregion observable-operators
  items: Observable<string[]> = this.searchTermStream
    .debounceTime(300)
    .distinctUntilChanged()
    .switchMap((term: string) => this.wikipediaService.search(term));
// #enddocregion observable-operators
}
