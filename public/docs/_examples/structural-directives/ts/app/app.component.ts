// #docregion
import {Component, Input}       from 'angular2/core';
import {Hero}                   from './hero';
import {HeroDetailComponent}    from './hero-detail.component';
import {HeroDashboardComponent} from './hero-dashboard.component';

@Component({
  selector: 'my-app',
  styles: ['button { min-width: 100px; }'],
  templateUrl: 'app/app.component.html',
  directives: [HeroDetailComponent, HeroDashboardComponent]
})
export class AppComponent {
  heroes: Hero[] = [
    { "id": 11, "name": "Mr. Nice", "status": "ready" },
    { "id": 12, "name": "Narco", "status": "injured" },
    { "id": 13, "name": "Bombasto", "status": "engaged" },
    { "id": 14, "name": "Celeritas", "status": "travelling" },
    { "id": 15, "name": "Magneta", "status": "injured" },
    { "id": 16, "name": "RubberMan", "status": "ready" },
    { "id": 17, "name": "Dynama", "status": "engaged" },
    { "id": 18, "name": "Dr IQ", "status": "engaged" },
    { "id": 19, "name": "Magma", "status": "travelling" },
    { "id": 20, "name": "Tornado", "status": "ready" }
  ];

  // #docregion alert
  alert = 'no alerts, everything normal.';

  updateAlert() {
    this.alert = 'under attack, recall all heroes to base!';
  }
  // #enddocregion alert
}
