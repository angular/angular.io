// #docregion
import {Component} from 'angular2/angular2';

@Component({selector: 'my-app'})
export class AppComponent { }
// #enddocregion

// #docregion initialize-routes-property
export class AppComponent {
  public title = 'Tour of Heroes';
  public routes = Routes;
}
// #enddocregion initialize-routes-property

// #docregion oninit
onInit() {
  this.heroes = this.getHeroes();
}

getHeroes() {
  this.heroes = [];

  this._heroService.getHeroes()
    .then((heroes: Hero[]) => this.heroes = heroes);

  return this.heroes;
}
// #enddocregion oninit

// #docregion styles
styles: [`
  .router-link {padding: 5px;text-decoration: none;}
  .router-link:visited, .router-link:link {color: #444;}
  .router-link:hover {color: white; background-color: #1171a3; text-decoration: none;}
  .router-link.router-link-active {color: white; background-color: #52b9e9; text-decoration: none;}
`],
// #enddocregion styles

// #docregion import-params
import {RouteParams} from 'angular2/router';
// #enddocregion import-params
// #docregion inject-routeparams
constructor(private _routeParams: RouteParams) {}
// #enddocregion inject-routeparams
// #docregion access-params
export class HeroDetailComponent implements OnInit {
  
onInit() { }
// #enddocregion access-params
// #docregion import-onit
import {Component, FORM_DIRECTIVES, OnInit} from 'angular2/angular2';
// #enddocregion import-onit
// #docregion onit-id-param
onInit() { let id = +this._routeParams.get('id'); // TODO: get the hero using it’s id }
// #enddocregion onit-id-param

// #docregion onit-hero-id
onInit() {
  if (!this.hero) {
    let id = +this._routeParams.get('id');
          // TODO: get the hero using it’s id
  }
}
// #docregion onit-hero-id

// #docregion inject-hero-service
constructor(
  private _heroService: HeroService,
  private _routeParams: RouteParams) {
}
// #docregion inject-hero-service

// #docregion onit-hero-method
  onInit() {
    if (!this.hero) {
      let id = +this._routeParams.get('id');
      this._heroService.getHero(id).then((hero: Hero) => this.hero = hero);
    }
  }
// #docregion onit-hero-method

// #docregion select-hero
import {Router} from 'angular2/router';
import {Routes} from './route.config';

constructor(private _heroService: HeroService, private _router: Router) { }

gotoDetail() {
  this._router.navigate([`/${Routes.detail.as}`, { id: this.selectedHero.id }]);
}
// #enddocregion select-hero

// #docregion reference-heroes-component
@Component({
  selector: 'my-heroes',
  templateUrl: 'app/heroes.component.html',
  styleUrls: ['app/heroes.component.css'],
  directives: [FORM_DIRECTIVES, HeroDetailComponent]
})
export class HeroesComponent {
// #docregion reference-heroes-component

// #docregion reference-hero-detail-component
@Component({
  selector: 'my-hero-detail',
  templateUrl: 'app/hero-detail.component.html',
  directives: [FORM_DIRECTIVES],
  inputs: ['hero']
})
export class HeroDetailComponent {
// #enddocregion reference-hero-detail-component