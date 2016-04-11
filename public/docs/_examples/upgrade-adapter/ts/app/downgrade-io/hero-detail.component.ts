// #docregion
import {Component, Input, Output, EventEmitter} from 'angular2/core';
import {Hero} from '../hero';

@Component({
  selector: 'hero-detail',
  template: `
    <h2>{{hero.name}} details!</h2>
    <div><label>id: </label>{{hero.id}}</div>
    <button (click)="onDelete()">Delete</button>
  `
})
export class HeroDetailComponent {
  @Input() hero:Hero
  @Output() deleted = new EventEmitter<Hero>();
  onDelete() {
    this.deleted.emit(this.hero);
  }
}
