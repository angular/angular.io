import {Component, OnInit} from 'angular2/core';
import {HeroDetailComponent} from './hero-detail.component';
import {HeroService} from './hero.service';
import {Hero} from './hero';
import {User} from './user';

@Component({
  selector: 'my-heroes',
  templateUrl: 'app/heroes.component.html',
  directives: [HeroDetailComponent],
  styleUrls: ['app/heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[] = [];
  currentHero: Hero;
  userName: string;

  constructor(private _heroService: HeroService, private _user: User) {
    this.userName = this._user.name || 'someone';
  }

  getSelectedClass(hero: Hero) {return { selected: hero === this.currentHero }};

  onDelete(hero?: Hero) {
    hero = hero || this.currentHero;
    let i = this.heroes.indexOf(hero);
    if (i > -1) {
      this.heroes.splice(i, 1);
    }
    this.currentHero = this.heroes[i] || this.heroes[i - 1];
  }

  ngOnInit(){
    this.heroes = this.onRefresh();
  }

  onRefresh() {
    //console.log('Refreshing heroes');
    // clear the decks
    this.currentHero = undefined;
    this.heroes = [];

    this._heroService.refresh()
      .then(heroes => this.heroes = heroes);

    return this.heroes;
  }

  onSelect(hero: Hero) {
    this.currentHero = hero;
    console.log(`Hero selected: ` + JSON.stringify(hero));
  }
}
