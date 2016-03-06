// #docregion
import {Component,Input, OnInit} from 'angular2/core';
import {FormBuilder, ControlGroup, FORM_DIRECTIVES} from 'angular2/common';
import {QuestionModel} from './question-model';

@Component({
  selector:'dynamic-form',
  templateUrl:'./app/dynamic-form.component.html',
  providers: [FormBuilder]
})

export class DynamicForm implements OnInit{

  model = new QuestionModel();

  @Input()
  set questions(questions){
    this.model.questions = questions;
  }

  form : ControlGroup;
  fb: FormBuilder;
  payLoad = null;

  constructor(fb: FormBuilder) {
    this.fb = fb;
  }

  ngOnInit(){
    this.form = this.fb.group(this.model.toGroup());
  }

  onSubmit() {
    this.payLoad = JSON.stringify(this.form.value);
  }
}