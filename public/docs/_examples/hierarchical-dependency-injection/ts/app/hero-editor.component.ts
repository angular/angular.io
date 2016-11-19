// #docregion
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { RestoreService } from './restore.service';
import { Hero } from './hero';

@Component({
  selector: 'hero-editor',
  // #docregion providers
  providers: [RestoreService],
  // #enddocregion providers
  template: `
    <div>
      <span>Name:</span>
      <input [(ngModel)]="hero.name"/>
      <div>
        <button (click)="onSaved()">save</button>
        <button (click)="onCanceled()">cancel</button>
      </div>
    </div>`
})

export class HeroEditorComponent {
  @Output() canceled = new EventEmitter<Hero>();
  @Output() saved = new EventEmitter<Hero>();

  constructor(private restoreService: RestoreService<Hero>) {}

  @Input()
  set hero (hero: Hero) {
    this.restoreService.setItem(hero);
  }

  get hero () {
    return this.restoreService.getItem();
  }

  onSaved () {
    this.saved.emit(this.restoreService.getItem());
  }

  onCanceled () {
    this.hero = this.restoreService.restoreItem();
    this.canceled.emit(this.hero);
  }
}
// #enddocregion
