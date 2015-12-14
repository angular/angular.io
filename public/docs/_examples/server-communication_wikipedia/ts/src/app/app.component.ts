// #docregion
import {bootstrap, Component, Control, Observable} from 'angular2/angular2';
import {JSONP_PROVIDERS, Jsonp, URLSearchParams} from 'angular2/http';
import {WikipediaService} from './wikipedia-service';


@Component({
  selector: 'app',
  template: `
    <h1>Wikipedia Demo</h1>
    <input [ng-form-control]="inputs"/>
    <ul>
      <li *ng-for="#item of items | async">{{item}}</li>
    </ul>
  `
})
class AppComponent {
  items: Observable<string>;
  // #docregion control
  inputs = new Control();
  // #enddocregion control
  constructor (private wikipediaService: WikipediaService) {
      // #docregion distinctdebounce
    this.items = this.inputs.valueChanges
      .debounceTime(300)
      .distinctUntilChanged()
      // #enddocregion distinctdebounce
      .switchMap((term) => wikipediaService.search(term));
  }

}

bootstrap(AppComponent, [JSONP_PROVIDERS, WikipediaService])
  .catch(err => console.error(err));
// #enddocregion
