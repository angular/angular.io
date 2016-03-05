// #docregion
import {QuestionBase} from './question-base';

export class DropdownQuestion extends QuestionBase<string>{

  options = [];

  constructor(){
    super();
    this.controlType = 'dropdown';
  }
}