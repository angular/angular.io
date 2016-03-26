// #docregion
import {Component,OnInit} from 'angular2/core';
import {LoggerService}    from './logger.service';
import {UserContext}      from './user-context.service';
import {Heroes}           from './hero-bios.component';
import {SortedHeroes}     from './sorted-heroes.component';
import {HeroOfTheMonth}   from './hero-of-the-month.component';

@Component({
  selector: 'my-app',
  directives:[Heroes,SortedHeroes,HeroOfTheMonth],
  template: 
  `<h1>DI Components</h1>
  <div class="di-component">
    <h3>Logged in user</h3>
    <div>Name: {{_userContext.name}}</div>
    <div>Role: {{_userContext.role}}</div>
  </div>
  
  <div class="di-component">
    <h3>Sorted Heroes</h3>
    <sorted-heroes></sorted-heroes>
  </div>
  
  <div class="di-component">
    <h3>Hero of the month</h3>
    <hero-of-the-month></hero-of-the-month>
  </div>
  
  <div class="di-component">
    <h3>Hero Bios</h3>
    <hero-bios></hero-bios>
  </div>`
})

export class AppComponent implements OnInit {
  
  private userId:number = 1;
  
  constructor(private _logger:LoggerService, private _userContext:UserContext){
    this._userContext.loadUser(this.userId);
  }
  
  ngOnInit(){
    this._logger.logInfo('AppComponent initialized');
  }
}
