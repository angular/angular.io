// #docregion
import {Component} from 'angular2/core';
import {LoggerService}  from './logger.service';
import {Spy} from './spy.directive';

@Component({
  selector: 'spy-parent',
  template: `
  <div class="parent">
    <h2>Spy Directive</h2>
    <p>
      <input [(ngModel)]="newName"
            (keyup.enter)="addHero()"
            placeholder="Hero name">
      <button (click)="addHero()">Add Hero</button>
      <button (click)="reset()">Reset Heroes</button>
    </p>` +
// #docregion template
    `<div *ngFor="#hero of heroes"  my-spy  class="heroes">
       {{hero}}
     </div>`
// #enddocregion template
+ `<h4>-- Spy Lifecycle Hook Log --</h4>
    <div *ngFor="#msg of spyLog">{{msg}}</div>
   </div>
  `,
  styles: [
     '.parent {background: khaki;}',
     '.heroes {background: LightYellow; padding: 0 8px}'
  ],
  directives: [Spy],
  providers:  [LoggerService]
})
export class SpyParentComponent {
  newName = 'Herbie';
  heroes:string[] = ['Windstorm', 'Magneta'];
  spyLog:string[];

  constructor(private _logger:LoggerService){
    this.spyLog = _logger.logs;
  }

  addHero() {
    if (this.newName.trim()) {
      this.heroes.push(this.newName.trim());
      this.newName = '';
      this._logger.tick();
    }
  }
  removeHero(hero:string) {
    this.heroes.splice(this.heroes.indexOf(hero), 1);
    this._logger.tick();
  }
  reset(){
    this._logger.log('-- reset --');
    this.heroes.length = 0;
    this._logger.tick();
  }
}
