import {Component, OnInit} from 'angular2/angular2';
import {Router} from 'angular2/router';
import {HeroService} from './hero.service';
import {HeroDetailComponent} from './hero-detail.component';
import {Hero} from './hero';
import {ROUTE_NAMES} from './routes';

@Component({
  selector: 'my-heroes',
  templateUrl: 'app/heroes.component.html',
  styleUrls: ['app/heroes.component.css'],
  directives: [HeroDetailComponent]
})
export class HeroesComponent implements OnInit {
  public heroes: Hero[];
  public selectedHero: Hero;

  constructor(private _heroService: HeroService, private _router: Router) { }

  getHeroes() {
    this.selectedHero = undefined;
    this.heroes = [];

    this._heroService.getHeroes().then(heroes => this.heroes = heroes);

    return this.heroes;
  }

  gotoDetail() {
    this._router.navigate([ROUTE_NAMES.heroDetail, { id: this.selectedHero.id }]);
  }

  ngOnInit() {
    this.heroes = this.getHeroes();
  }

  onSelect(hero: Hero) { this.selectedHero = hero; }
}
