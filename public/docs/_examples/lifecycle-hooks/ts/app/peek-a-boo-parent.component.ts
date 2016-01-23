// #docregion
import {Component}         from 'angular2/core';
import {PeekABooComponent} from './peek-a-boo.component'
import {LoggerService}  from './logger.service';

@Component({
  selector: 'peek-a-boo-parent',
  template: `
  <div class="parent">
    <h2>Peek-A-Boo</h2>

    <button (click)="toggleChild()">
      {{hasChild ? 'Destroy' : 'Create'}} PeekABooComponent
    </button>
    <button (click)="updateHero()" [hidden]="!hasChild">Update Hero</button>

    <peek-a-boo *ngIf="hasChild" [name]="heroName">
    </peek-a-boo>

    <h4>-- Lifecycle Hook Log --</h4>
    <div *ngFor="#msg of hookLog">{{msg}}</div>
  </div>
  `,
  styles: ['.parent {background: moccasin}'],
  directives: [PeekABooComponent],
  providers: [LoggerService]
})
export class PeekABooParentComponent {

  hasChild = false;
  hookLog:string[];

  heroName = 'Windstorm';
  private _logger:LoggerService;

  constructor(logger:LoggerService){
    this._logger = logger;
    this.hookLog = logger.logs;
  }

  toggleChild() {
    this.hasChild = !this.hasChild;
    if (this.hasChild) {
      this.heroName = 'Windstorm';
      this._logger.clear(); // clear log on create
    }
    this._logger.tick();
  }

  updateHero() {
    this.heroName += '!';
    this._logger.tick();
  }
}
