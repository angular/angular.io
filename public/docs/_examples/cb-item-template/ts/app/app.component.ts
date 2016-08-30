// #docplaster
// #docregion
import { Component } from '@angular/core';

interface Color {
  hex: string;
  name: string;
}

// #docregion metadata
@Component({
  selector: 'my-app',
  template: `
    <p>
      Selected color: {{ selectedColor?.name || "None selected" }}.
    </p>

    <simple-select [items]="colors" [(value)]="selectedColor">
      <template let-item="item">
        <span class="swatch" [style.backgroundColor]="item.hex"></span>
        <span class="name">{{ item.hex }} &mdash; {{ item.name }}</span>
      </template>
    </simple-select>

    <simple-select
      [items]="colors"
      [(value)]="selectedColor"
      [template]="itemTemplateRef">
    </simple-select>

    <template #itemTemplateRef let-item="item">
      <span class="name" [style.color]="item.hex">
        {{ item.hex }} &mdash; {{ item.name }}
      </span>
    </template>
  `
})
// #enddocregion metadata
export class AppComponent {
  colors: Color[];
  selectedColor: Color;

  constructor() {
    this.colors = [
      { hex: '#000000', name: 'Black' },
      { hex: '#FFFFFF', name: 'White' },
      { hex: '#FFD700', name: 'Gold' },
      { hex: '#7FFFD4', name: 'Aquamarine' },
      { hex: '#800080', name: 'Purple' },
      { hex: '#6DC066', name: 'Green' },
      { hex: '#FF00FF', name: 'Magenta' }
    ];
    this.selectedColor = this.colors[0];
  }

}
