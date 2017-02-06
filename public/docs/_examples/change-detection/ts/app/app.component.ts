// #docregion
import {Component}           from 'angular2/core';
import {HeroesComponent,
        HeroesComponentTicking,
        HeroesOnPushComponent,
        HeroesChangeDetectorComponent} from './heroes.component';

@Component({
  selector: 'my-app',
  templateUrl: 'app/app.component.html',
  directives: [
    HeroesComponent,
    HeroesComponentTicking,
    HeroesOnPushComponent,
    HeroesChangeDetectorComponent
  ]
})
export class AppComponent { }
