import { Component, EventEmitter, Output, HostBinding, HostListener } from '@angular/core';

// #docregion
@Component({
  selector: 'a11y-custom-button',
  templateUrl: './app/shared/a11y-custom-button.component.html'
})
export class A11yCustomButtonComponent {

  @HostBinding('attr.role') role = 'button';

  @HostBinding('attr.class') classes = 'btn btn-primary';

  @HostBinding('attr.tabindex') tabIndex = '0';

  @Output() click: EventEmitter<any> = new EventEmitter();

  @HostListener('keydown.space')
  @HostListener('keydown.enter')
  onKeyDown() {
    this.click.emit(null);
  }

}
// #enddocregion
