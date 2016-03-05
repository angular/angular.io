// #docregion
import {Validators} from 'angular2/common';

export class QuestionModel {

  questions = [];

  constructor(questions) {
    this.questions = questions;
  }

  toGroup() {
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