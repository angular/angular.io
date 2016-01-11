// #docregion
import {Component} from 'angular2/core';
import {LoggerService}  from './logger.service';
import {Spy} from './spy.directive';

@Component({
  selector: 'spy-parent',
  template: `
  <div class="parent">
    <h2>Spy Directive</h2>

    <input [(ngModel)]="newName" (keyup.enter)="addHero()">
    <button (click)="addHero()">Add Hero</button>
    <button (click)="reset()">Reset Heroes</button>

    <p></p>
    <div *ngFor="#hero of heroes" my-spy class="heroes">
      {{hero}}
    </div>

    <h4>-- Spy Lifecycle Hook Log --</h4>
    <div *ngFor="#msg of spyLog">{{msg}}</div>
   </div>
  `,
  styles: [
     '.parent {background: khaki; padding: 10px; margin:100px 8px}',
     '.heroes {background: LightYellow; padding: 0 8px}'
  ],
  directives: [Spy],
  providers: [LoggerService]
})
export class SpyParentComponent {
  newName = 'Herbie';
  heroes:string[] = ['Windstorm', 'Magneta'];
  spyLog:string[];

  private _logger:LoggerService;

  constructor(logger:LoggerService){
    this._logger = logger;
    this.spyLog = logger.logs;
  }

  addHero() {
    if (this.newName.trim()) {
      this.heroes.push(this.newName.trim());
      this.newName = '';
    }
  }

  reset(){
    this._logger.log('-- reset --');
    this.heroes.length = 0;
  }
}
