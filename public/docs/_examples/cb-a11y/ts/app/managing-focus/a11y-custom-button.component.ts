import {Component, EventEmitter, Output} from "angular2/core";

@Component({
  selector: 'a11y-custom-button',
  templateUrl: './app/managing-focus/a11y-custom-button.component.html'
})
export class A11yCustomButton {

  @Output()
  onClick: EventEmitter<any> = new EventEmitter();

  onKeyDown(){
    this.onClick.emit(null);
  }

}
