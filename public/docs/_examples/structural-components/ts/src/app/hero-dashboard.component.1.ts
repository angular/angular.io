// #docplaster
// #docregion
import {Component, Input}    from 'angular2/core';
import {Hero}                from './hero';
import {HeroDetailComponent} from './hero-detail.component';
import {HeroStatusPipe}      from './hero-status.pipe';

@Component({
  selector: 'hero-dashboard',
  templateUrl: 'app/hero-dashboard.component.html',
  styleUrls: ['app/hero-dashboard.css'],
  pipes: [HeroStatusPipe]
})
export class HeroDashboardComponent {

  @Input() heroes: Hero[];

  recallAllHeroes() {
    // call recall on all HeroDetail components
  }
}
// #enddocregion
