import {Component} from "angular2/core";
import {A11yHelper} from "../services/a11y-helper.service";
import {A11yCustomControl} from "../shared/a11y-custom-control.component";
import {A11yValueHelper} from "../shared/a11y-value-helper.component";
import {A11yCustomButton} from "../shared/a11y-custom-button.component";

@Component({
  selector: 'a11y-component-roles',
  templateUrl: './app/component-roles/a11y-component-roles.component.html',
  directives: [
    A11yCustomControl,
    A11yValueHelper,
    A11yCustomButton
  ]
})
export class A11yComponentRoles {

  inputDivModel: string = '';
  buttonClicks: number = 0;

  constructor(private _a11yHelper: A11yHelper){}

  onClick():void {
    this.buttonClicks++;
  }

  generateSkiplink(hash:string){
    return this._a11yHelper.getInternalLink(hash, 'ComponentRoles');
  }

  generateButtonString(): string{
    return `Button has been clicked ${this.buttonClicks} times`;
  }

}
