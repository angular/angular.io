// #docregion
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Hero }             from './hero';
import { HeroStateService } from './hero-state.service';

@Component({
  moduleId: module.id,
  selector: 'hero-card',
  templateUrl: './hero-card.component.html',
  styleUrls: [ './hero-card.component.css' ],
  // #docregion providers
  providers: [ HeroStateService ]
  // #enddocregion providers
})
export class HeroCardComponent {

  @Output() close = new EventEmitter<void>();

  @Input()
  get hero() {
    return this.heroStateService.hero;
  }
  set hero (hero: Hero) {
    this.heroStateService.hero = hero;
  }

  constructor(private heroStateService: HeroStateService ) { }

  onCanceled()  {
    this.heroStateService.restoreHero();
  };

  onClose()  {
    this.close.emit();
  };

  onSaved() {
    this.heroStateService.saveHero();
  }
}
