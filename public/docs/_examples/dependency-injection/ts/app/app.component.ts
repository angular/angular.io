// #docplaster
// #docregion
// #docregion imports
import {Component, Inject, provide} from 'angular2/core';

import {CarComponent}      from './car/car.component';
import {HeroesComponent}   from './heroes/heroes.component';

import {APP_CONFIG,
        Config, CONFIG}    from './app.config';
import {Logger}            from './logger.service';

import {User, UserService} from './user.service';
// #enddocregion imports
import {InjectorComponent} from './injector.component';
import {TestComponent}     from './test.component';
import {ProvidersComponent} from './providers.component';

@Component({
  selector: 'my-app',
  template:  `
    <h1>{{title}}</h1>
    <my-car></my-car>
    <my-injectors></my-injectors>
    <my-tests></my-tests>
    <h2>User</h2>
    <p id="user">
      {{userInfo}}
      <button (click)='nextUser()'>Next User</button>
    <p>
    <my-heroes id="authorized" *ngIf="isAuthorized"></my-heroes>
    <my-heroes id="unauthorized" *ngIf="!isAuthorized"></my-heroes>
  `,
  directives:[CarComponent, HeroesComponent,
              InjectorComponent, TestComponent, ProvidersComponent],
// #docregion providers
  providers: [
    Logger,
    UserService,
    provide(APP_CONFIG, {useValue: CONFIG})
  ]
// #enddocregion providers
})
export class AppComponent {
  title:string;

  //#docregion ctor
  constructor(
    @Inject(APP_CONFIG) config:Config,
    private _userService: UserService) {

    this.title = config.title;
  }
  // #enddocregion ctor

  get isAuthorized() { return this.user.isAuthorized;}
  nextUser()         { this._userService.getNewUser(); }
  get user()         { return this._userService.user; }

  get userInfo()     {
    return `Current user, ${this.user.name}, is `+
           `${this.isAuthorized ? '' : 'not'} authorized. `;
  }
}
// #enddocregion
