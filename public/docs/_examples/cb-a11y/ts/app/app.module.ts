import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { A11yIndexComponent } from './a11y-index.component';
import { A11yFormControlsComponent } from './form-controls/a11y-form-controls.component';
import { A11yDevToolsComponent } from './dev-tools/a11y-dev-tools.component';
import { A11yErrorDemoComponent } from './managing-focus/a11y-error-demo.component';
import { A11yManagingFocusComponent } from './managing-focus/a11y-managing-focus.component';
import { A11yComponentRolesComponent } from './component-roles/a11y-component-roles.component';
import { A11yDevToolsIndexComponent } from './dev-tools/a11y-dev-tools-index.component';
import { A11yPassComponent } from './dev-tools/a11y-pass/a11y-pass.component';
import { A11yFailsComponent } from './dev-tools/a11y-fails/a11y-fails.component';
import { A11yInputWrapperComponent } from './form-controls/a11y-input-wrapper.component';
import { A11yCustomButtonComponent } from './shared/a11y-custom-button.component';
import { A11yCustomControlComponent } from './shared/a11y-custom-control.component';
import { A11yValueHelperComponent } from './shared/a11y-value-helper.component';
import { A11yHelperService } from './services/a11y-helper.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    A11yIndexComponent,
    A11yComponentRolesComponent,
    A11yFailsComponent,
    A11yPassComponent,
    A11yDevToolsIndexComponent,
    A11yDevToolsComponent,
    A11yFormControlsComponent,
    A11yInputWrapperComponent,
    A11yErrorDemoComponent,
    A11yManagingFocusComponent,
    A11yCustomButtonComponent,
    A11yCustomControlComponent,
    A11yValueHelperComponent
  ],
  providers: [ A11yHelperService ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
