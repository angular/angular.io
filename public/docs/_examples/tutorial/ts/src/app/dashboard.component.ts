import {Component, OnInit} from 'angular2/angular2';
import {Router} from 'angular2/router';
import {Hero} from './hero';
import {HeroService} from './hero.service';
import {ROUTE_NAMES} from './routes';

@Component({
  selector: 'my-dashboard',
  templateUrl: 'app/dashboard.component.html',
  styleUrls: ['app/dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public heroes: Hero[] = [];

  constructor(private _heroService: HeroService, private _router: Router) { }

  ngOnInit() {
    this._heroService.getHeroes().then(heroes => this.heroes = heroes);
  }

  gotoDetail(hero: Hero) {
    this._router.navigate([ROUTE_NAMES.heroDetail, { id: hero.id }]);
  }
}
