// #docregion
import {Component} from 'angular2/core'

import {DynamicForm} from './dynamic-form.component'
import {TextboxQuestion} from './textbox-question'
import {DropdownQuestion} from './dropdown-question'

@Component({
  selector: 'my-app',
  providers: [],
  template: `
    <div> 
      <h2>Dynamic Form</h2>
      <dynamic-form [questions]="questions"></dynamic-form>
    </div>
  `,
  directives: [DynamicForm]
})
export class App {

  questions = [];

  constructor(){
    let question = new TextboxQuestion();
    question.key = 'firstName';
    question.text = 'First name';
    question.required = true;
    question.order = 1;
    this.questions.push(question);

    question = new TextboxQuestion();
    question.key = 'emailAddress';
    question.text = 'Email';
    question.required = false;
    question.type = 'email';
    question.order = 3;
    this.questions.push(question);

    let ddQuestion = new DropdownQuestion();
    ddQuestion.key = 'country';
    ddQuestion.text = 'Country';
    ddQuestion.options.push({key:'usa',value:'USA'});
    ddQuestion.options.push({key:'germany',value:'Germany'});
    ddQuestion.options.push({key:'canada',value:'Canada'});
    ddQuestion.options.push({key:'australia',value:'Australia'});
    ddQuestion.order = 4;
    this.questions.push(ddQuestion);

    this.questions.sort((a,b) => a.order - b.order);
  }
}