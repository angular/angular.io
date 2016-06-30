// #docregion
import { Component } from '@angular/core';

import { BypassSecurityComponent } from './bypass-security.component';
import { InnerHtmlBindingComponent } from './inner-html-binding.component';

@Component({
  selector: 'my-app',
  template: `
  <h1>Security</h1>
  <inner-html-binding></inner-html-binding>
  <bypass-security></bypass-security>
  `,
  directives: [
    BypassSecurityComponent,
    InnerHtmlBindingComponent,
  ]
})
export class AppComponent {
}
