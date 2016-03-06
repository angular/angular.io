// #docregion
import {Validators, ControlGroup} from 'angular2/common';

export class QuestionModel {

  questions = [];

  toGroup() : ControlGroup {
    let group = {};

    this.questions.forEach((question) => {
        group[question.key] = [''];
        if (question.required) {
            group[question.key].push(Validators.required);
        }
    });
    return group;
  }
}