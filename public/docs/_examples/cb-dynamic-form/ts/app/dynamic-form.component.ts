// #docregion
import {Component,Input, OnInit} from 'angular2/core';
import {FormBuilder, ControlGroup, FORM_DIRECTIVES} from 'angular2/common';
import {QuestionModel} from './question-model';

@Component({
  selector:'dynamic-form',
  templateUrl:'./src/dynamic-form.html',
  providers: [FormBuilder]
})

export class DynamicForm implements OnInit{

  @Input() questions = [];
  form : ControlGroup;
  fb: FormBuilder;
  payLoad = null;

  constructor(fb: FormBuilder) {
    this.fb = fb;
  }

  ngOnInit(){
    let group = {};

    let questionModel = new QuestionModel(this.questions);

    this.form = this.fb.group(questionModel.toGroup());
  }

  onSubmit() {
    this.payLoad = JSON.stringify(this.form.value);
  }
}