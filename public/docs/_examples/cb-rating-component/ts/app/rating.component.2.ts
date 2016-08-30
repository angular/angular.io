// #docregion
import { Component } from '@angular/core';

@Component({
  selector: 'my-hero-rating',
  // #docregion template
  template: `
    <template ngFor [ngForOf]="range" let-index="index">
      <span class="sr-only">(*)</span>
      <i class="glyphicon glyphicon-star"></i>
    </template>
  `
  // #enddocregion template
})
export class HeroRatingComponent { }
// #enddocregion
