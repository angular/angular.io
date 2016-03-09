// #docregion
import {QuestionBase} from './question-base';

export class DropdownQuestion extends QuestionBase<string>{

  options:Array<Object> = [];

  constructor(){
    super();
    this.controlType = 'dropdown';
  }
}