// #docregion
import {Component}        from 'angular2/core';
import {JSONP_PROVIDERS}  from 'angular2/http';
import {Observable}       from 'rxjs/Observable';
// #docregion import-observer
import {Observer}         from 'rxjs/Observer';
// #enddocregion import-observer

import {WikipediaService} from './wikipedia.service';

@Component({
  selector: 'my-wiki-smart',
  template: `
    <h1>Smarter Wikipedia Demo</h1>
    <p><i>Fetches when typing stops</i></p>

    <input #term (keyup)="search(term.value)"/>

    <ul>
      <li *ngFor="#item of items | async">{{item}}</li>
    </ul>
  `,
  providers:[JSONP_PROVIDERS, WikipediaService]
})
export class WikiSmartComponent {

  constructor (private _wikipediaService: WikipediaService) { }

  search: (value: string) => void;

  // #docregion observable-create
  private _searchTermStream: Observable<string> =
    Observable.create(
      // #docregion subscribe-fn
      (observer:Observer<string>) => this.search = (term) => observer.next(term)
      // #enddocregion subscribe-fn
    );
  // #enddocregion observable-create

  // #docregion observable-operators
  items:Observable<string[]> = this._searchTermStream
    .debounceTime(300)
    .distinctUntilChanged()
    .switchMap((term:string) => this._wikipediaService.search(term));
// #enddocregion observable-operators
}
