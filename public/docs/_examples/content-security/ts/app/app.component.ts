// #docregion
import { Component } from '@angular/core';

import { BypassSecurityComponent } from './bypass-security.component';
import { EvilBindingComponent }    from './evil-binding.component';
import { EvilStringComponent }     from './evil-string.component';
import { EvilTemplateComponent }   from './evil-template.component';
import { HighlightComponent }      from './highlight.component';


@Component({
  selector: 'app-root',
  template: `
  <h1>Content Security</h1>
  <evil-binding></evil-binding>
  <evil-string></evil-string>
  <evil-template></evil-template>
  <high-light></high-light>
  <bypass-security></bypass-security>
  `,
  directives: [
    BypassSecurityComponent,
    EvilBindingComponent,
    EvilStringComponent,
    EvilTemplateComponent,
    HighlightComponent
  ]
})

export class AppComponent { }
