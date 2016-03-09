// #docregion
import {QuestionBase} from './question-base';

export class TextboxQuestion extends QuestionBase<string>{

  type:string;

  constructor(){
    super();
    this.controlType = 'textbox';
  }
}