import {Component, OnInit} from 'angular2/angular2';
import {RouteParams} from 'angular2/router';
import {Hero} from './hero';
import {HeroService} from './hero.service';
import {ROUTE_NAMES} from './routes';

@Component({
  selector: 'my-hero-detail',
  templateUrl: 'app/hero-detail.component.html',
  inputs: ['hero']
})
export class HeroDetailComponent implements OnInit {
  public hero: Hero;

  constructor(private _heroService: HeroService,
    private _routeParams: RouteParams) {
  }

  onInit() {
    if (!this.hero) {
      let id = +this._routeParams.get('id');
      this._heroService.getHero(id).then(hero => this.hero = hero);
    }
  }

  goBack() {
    window.history.back();
  }
}
