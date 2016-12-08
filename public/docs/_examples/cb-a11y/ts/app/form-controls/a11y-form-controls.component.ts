import { Component, OnInit } from '@angular/core';

import { A11yHelperService } from '../services/a11y-helper.service';

@Component({
  moduleId: module.id,
  selector: 'a11y-form-controls',
  templateUrl: 'a11y-form-controls.component.html'
})
export class A11yFormControlsComponent implements OnInit {
  checkBoxes: any;
  radioButtons: any;
  selectOptions: any;

  inputModel: string;
  inputExplicitModel: string;
  inputWrappedModel: string;
  inputWrappedSaveModel = '';
  inputDivModel = '';
  textModel: string;
  selectModel = 'Curiosity';
  searchModel: string;
  filterModel: string;

  radioModel = 'TypeScript';
  checkboxModel = ['Observables', 'Components'];


  constructor(private a11yHelper: A11yHelperService) {
  }

  isChecked(item: string): boolean {
    return this.a11yHelper.isStringInArray(this.checkboxModel, item);
  }

  toggleCheckbox(item: string): void {
    this.a11yHelper.toggleItemInArray(this.checkboxModel, item);
  }

  onSave(): void {
    this.inputWrappedSaveModel = this.inputWrappedModel;
  }

  ngOnInit(): void {
    this.checkBoxes = this.a11yHelper.getCheckboxModel();
    this.radioButtons = this.a11yHelper.getRadiobuttonsModel();
    this.selectOptions = this.a11yHelper.getSelectOptions();
  }

  updateSelect(value: string): void {
    this.selectModel = value;
  }

}
