import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'toh-filter-text',
  template: '<div>filter</div>'
})
export class FilterTextComponent {
  @Output() changed: EventEmitter<string>;
  filter: string;

  constructor() { }

  clear() {
  }

  filterChanged(event: any) {
  }
}
