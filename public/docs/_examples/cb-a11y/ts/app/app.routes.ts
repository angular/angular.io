import { provideRouter, RouterConfig } from '@angular/router';
import { A11yIndexComponent } from './a11y-index.component';
import { A11yFormControlsComponent } from './form-controls/a11y-form-controls.component';
import { A11yDevToolsComponent } from './dev-tools/a11y-dev-tools.component';
import { A11yManagingFocusComponent } from './managing-focus/a11y-managing-focus.component';
import { A11yComponentRolesComponent } from './component-roles/a11y-component-roles.component';
import { A11yDevToolsIndexComponent } from './dev-tools/a11y-dev-tools-index.component';
import { A11yPassComponent } from './dev-tools/a11y-pass/a11y-pass.component';
import { A11yFailsComponent } from './dev-tools/a11y-fails/a11y-fails.component';

export const routes: RouterConfig = [
  {path: '', component: A11yIndexComponent},
  {path: 'form-controls', component: A11yFormControlsComponent},
  {path: 'managing-focus', component: A11yManagingFocusComponent},
  {path: 'component-roles', component: A11yComponentRolesComponent},
  {
    path: 'dev-tools', component: A11yDevToolsComponent, children: [
    {path: '', component: A11yDevToolsIndexComponent},
    {path: 'fail-demo', component: A11yFailsComponent},
    {path: 'pass-demo', component: A11yPassComponent}
  ]
  }
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
