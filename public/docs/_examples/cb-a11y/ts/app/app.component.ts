import {Component} from "angular2/core";
import {ROUTER_DIRECTIVES, RouteConfig, ROUTER_PROVIDERS} from "angular2/router";
import {A11yFormControls} from "./form-controls/a11y-form-controls.component";
import {A11yIndex} from "./a11y-index.component";
import {A11yHelper} from "./services/a11y-helper.service";
import {A11yManagingFocus} from "./managing-focus/a11y-managing-focus.component";
import {A11yComponentRoles} from "./component-roles/a11y-component-roles.component";

@Component({
  selector: 'app',
  templateUrl: 'app/app.component.html',
  directives:[
    ROUTER_DIRECTIVES,
    A11yIndex
  ],
  providers: [
    ROUTER_PROVIDERS,
    A11yHelper
  ]
})
@RouteConfig([
  {path:'/', name: 'Index', component: A11yIndex},
  {path:'/form-controls', name: 'FormControls', component: A11yFormControls},
  {path:'/managing-focus', name: 'ManagingFocus', component: A11yManagingFocus},
  {path:'/component-roles', name: 'ComponentRoles', component: A11yComponentRoles}
])
export class AppComponent {

}
