import {Component, Output, EventEmitter} from "angular2/core";

// #docregion
@Component({
  selector: 'a11y-input-wrapper',
  templateUrl: './app/form-controls/a11y-input-wrapper.component.html',
  styleUrls: ['./app/form-controls/a11y-input-wrapper.component.css']
})
export class A11yInputWrapper{

  @Output()
  onSave: EventEmitter<any> = new EventEmitter();

  save(){
    this.onSave.emit(null);
  }
}
// #enddocregion
