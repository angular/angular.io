// #docregion
import { Component, Input } from '@angular/core';
import { FormGroup, REACTIVE_FORM_DIRECTIVES } from '@angular/forms';

import { QuestionBase }     from './question-base';

@Component({
  selector: 'df-question',
  templateUrl: 'app/dynamic-form-question.component.html',
  directives: [REACTIVE_FORM_DIRECTIVES]
})
export class DynamicFormQuestionComponent {
  @Input() question: QuestionBase<any>;
  @Input() form: FormGroup;
  get isValid() { return this.form.controls[this.question.key].valid; }
}
