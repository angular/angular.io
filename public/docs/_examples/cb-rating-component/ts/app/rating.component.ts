// #docregion
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'my-hero-rating',
  // #docregion rating-template
  template: `
    <template ngFor [ngForOf]="range" let-index="index">
      <span class="sr-only">({{ index < rate ? '*' : ' ' }})</span>
      <i class="glyphicon {{index < rate ? 'glyphicon-star' : 'glyphicon-star-empty'}}" (click)="update(index + 1)"></i>
    </template>
  `
  // #enddocregion rating-template
})
export class HeroRatingComponent {
  // #docregion range-attribute
  range = new Array(5);
  // #enddocregion range-attribute

  // #docregion rate-input
  @Input() rate: number;
  // #enddocregion rate-input
  // #docregion rate-output
  @Output() rateChange = new EventEmitter<number>();
  // #enddocregion rate-output

  // #docregion update-method
  update(value: number): void {
    this.rate = value;
    this.rateChange.emit(value);
  }
  // #enddocregion update-method
}
// #enddocregion
