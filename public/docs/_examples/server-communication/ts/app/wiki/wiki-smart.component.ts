/* tslint:disable: member-ordering forin */
// #docplaster
// #docregion
import { Component, OnInit }        from '@angular/core';
import { Observable }       from 'rxjs/Observable';
// #docregion import-subject
import { Subject }          from 'rxjs/Subject';
// #enddocregion import-subject

import { WikipediaService } from './wikipedia.service';

@Component({
  moduleId: module.id,
  selector: 'my-wiki-smart',
  templateUrl: './wiki.component.html',
  providers: [ WikipediaService ]
})
export class WikiSmartComponent implements OnInit {
  title   = 'Smarter Wikipedia Demo';
  fetches = 'Fetches when typing stops';
  items: Observable<string[]>;

  // #docregion subject
  private searchTermStream = new Subject<string>();
  search(term: string) { this.searchTermStream.next(term); }
  // #enddocregion subject

  constructor (private wikipediaService: WikipediaService) {}

  ngOnInit() {
    // #docregion observable-operators
    this.items = this.searchTermStream
      .debounceTime(300)
      .distinctUntilChanged()
      .switchMap((term: string) => this.wikipediaService.search(term));
    // #enddocregion observable-operators
  }
}
