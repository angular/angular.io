import {Component, OnInit} from "angular2/core";
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from "angular2/common";
import {A11yHelper} from "../services/a11y-helper.service";
import {ROUTER_DIRECTIVES} from "angular2/router";
import {A11yCustomControl} from "./a11y-custom-control.component";
import {A11yInputWrapper} from "./a11y-input-wrapper.component";
import {A11yValueHelper} from "../a11y-value-helper.component";

@Component({
  selector: 'a11y-form-controls',
  templateUrl: './app/form-controls/a11y-form-controls.component.html',
  directives: [
    CORE_DIRECTIVES,
    FORM_DIRECTIVES,
    ROUTER_DIRECTIVES,
    A11yCustomControl,
    A11yInputWrapper,
    A11yValueHelper
  ]
})
export class A11yFormControls implements OnInit {

  checkBoxes:any;
  radioButtons:any;
  selectOptions:any;

  inputModel:string;
  inputExplicitModel: string;
  inputWrappedModel: string;
  inputWrappedSaveModel:string = '';
  inputDivModel: string = '';
  textModel:string;
  selectModel: string = 'Curiosity';
  searchModel: string;
  filterModel: string;

  radioModel:string = 'TypeScript';
  checkboxModel:Array<string> = ["Observables", "Components"];


  constructor(private _a11yHelper:A11yHelper) {
  }

  generateSkiplink(hash:string){
    return this._a11yHelper.getInternalLink(hash, 'FormControls');
  }

  isChecked(item:string):boolean {
    return this._a11yHelper.isStringInArray(this.checkboxModel, item);
  }

  toggleCheckbox(item:string):void {
    this._a11yHelper.toggleItemInArray(this.checkboxModel, item);
  }

  onSave(){
    this.inputWrappedSaveModel = this.inputWrappedModel;
  }

  ngOnInit() {
    this.checkBoxes = this._a11yHelper.getCheckboxModel();
    this.radioButtons = this._a11yHelper.getRadiobuttonsModel();
    this.selectOptions = this._a11yHelper.getSelectOptions();
  }

  updateSelect(value: string):void{
    this.selectModel = value;
  }

}
