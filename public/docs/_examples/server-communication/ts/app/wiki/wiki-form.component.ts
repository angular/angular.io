// #docregion
import {Component, OnInit} from 'angular2/core';
import {Control} from 'angular2/common';
import {Observable} from 'rxjs/Observable';
import {JSONP_PROVIDERS, Jsonp, URLSearchParams} from 'angular2/http';
import {WikipediaService} from './wikipedia.service';

@Component({
  selector: 'my-wiki-form',
  template: `
    <h1>Wikipedia Form Demo</h1>
    <p><i>Fetches when typing stops</i></p>
    <input [ngFormControl]="inputs"/>
    <ul>
      <li *ngFor="#item of items | async">{{item}}</li>
    </ul>
  `,
  providers:[JSONP_PROVIDERS, WikipediaService]
})
export class WikiFormComponent implements OnInit {

  constructor (private _wikipediaService: WikipediaService) {}

  items: Observable<string>;
  // #docregion control
  inputs = new Control();
  // #enddocregion control

  ngOnInit() {
      // #docregion distinctdebounce
    this.items = this.inputs.valueChanges
      .debounceTime(300)
      .distinctUntilChanged()
      // #enddocregion distinctdebounce
      .switchMap((term:string) => this._wikipediaService.search(term));
  }
}
