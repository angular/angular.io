import { Component, OnInit } from '@angular/core';
import { CORE_DIRECTIVES } from '@angular/common';
import { FORM_DIRECTIVES } from '@angular/forms';
import { A11yHelperService } from '../services/a11y-helper.service';
import { A11yInputWrapperComponent } from './a11y-input-wrapper.component';
import { A11yValueHelperComponent } from '../shared/a11y-value-helper.component';
import { A11yCustomControlComponent } from '../shared/a11y-custom-control.component';

@Component({
  selector: 'a11y-form-controls',
  templateUrl: './app/form-controls/a11y-form-controls.component.html',
  directives: [
    CORE_DIRECTIVES,
    FORM_DIRECTIVES,
    A11yCustomControlComponent,
    A11yInputWrapperComponent,
    A11yValueHelperComponent
  ]
})
export class A11yFormControlsComponent implements OnInit {

  checkBoxes: any;
  radioButtons: any;
  selectOptions: any;

  inputModel: string;
  inputExplicitModel: string;
  inputWrappedModel: string;
  inputWrappedSaveModel: string = '';
  inputDivModel: string = '';
  textModel: string;
  selectModel: string = 'Curiosity';
  searchModel: string;
  filterModel: string;

  radioModel: string = 'TypeScript';
  checkboxModel: Array<string> = ['Observables', 'Components'];


  constructor(private _a11yHelper: A11yHelperService) {
  }

  isChecked(item: string): boolean {
    return this._a11yHelper.isStringInArray(this.checkboxModel, item);
  }

  toggleCheckbox(item: string): void {
    this._a11yHelper.toggleItemInArray(this.checkboxModel, item);
  }

  onSave() {
    this.inputWrappedSaveModel = this.inputWrappedModel;
  }

  ngOnInit() {
    this.checkBoxes = this._a11yHelper.getCheckboxModel();
    this.radioButtons = this._a11yHelper.getRadiobuttonsModel();
    this.selectOptions = this._a11yHelper.getSelectOptions();
  }

  updateSelect(value: string): void {
    this.selectModel = value;
  }

}
