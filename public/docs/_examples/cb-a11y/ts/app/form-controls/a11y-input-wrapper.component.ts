import { Component, Output, EventEmitter } from '@angular/core';

// #docregion
@Component({
  moduleId: module.id,
  selector: 'a11y-input-wrapper',
  templateUrl: 'a11y-input-wrapper.component.html',
  styleUrls: ['a11y-input-wrapper.component.css']
})
export class A11yInputWrapperComponent {
  @Output() onSave = new EventEmitter();

  save(): void {
    this.onSave.emit(null);
  }
}
// #enddocregion
