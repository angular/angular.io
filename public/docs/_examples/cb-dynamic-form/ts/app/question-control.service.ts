// #docregion
import {Injectable}   from 'angular2/core';
import {ControlGroup, FormBuilder, Validators} from 'angular2/common';
import {QuestionBase} from './question-base';

@Injectable()
export class QuestionControlService {
  constructor(private _fb:FormBuilder){ }

  toControlGroup(questions:QuestionBase<any>[] ) {
    let group = {};

    questions.forEach(question => {
      group[question.key] = question.required ? [question.value || '', Validators.required] : [];
    });
    return this._fb.group(group);
  }
}
