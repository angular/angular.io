// #docregion
import {Component, Input, OnInit}  from 'angular2/core';
import {ControlGroup}              from 'angular2/common';

import {QuestionBase}                 from './question-base';
import {QuestionControlService}       from './question-control.service';
import {DynamicFormQuestionComponent} from './dynamic-form-question.component';

@Component({
  selector:'dynamic-form',
  templateUrl:'app/dynamic-form.component.html',
  directives: [DynamicFormQuestionComponent],
  providers:  [QuestionControlService]
})
export class DynamicForm {

  @Input() questions: QuestionBase<any>[] = [];
  form: ControlGroup;
  payLoad = '';

  constructor(private _qcs: QuestionControlService) {  }

  ngOnInit(){
    this.form = this._qcs.toControlGroup(this.questions);
  }

  onSubmit() {
    this.payLoad = JSON.stringify(this.form.value);
  }
}
