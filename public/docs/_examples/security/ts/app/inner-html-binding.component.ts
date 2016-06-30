// #docregion
import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'inner-html-binding',
  templateUrl: 'inner-html-binding.component.html',
})
// #docregion inner-html-controller
export class InnerHtmlBindingComponent {
  // E.g. a user/attacker controlled value from a URL.
  htmlSnippet = 'Template <script>alert("0wned")</script> <b>Syntax</b>';
}
