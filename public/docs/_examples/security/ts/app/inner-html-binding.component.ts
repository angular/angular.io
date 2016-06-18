// #docregion
import {Component} from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'inner-html-binding',
  templateUrl: 'inner-html-binding.component.html',
})
export class InnerHtmlBindingComponent {
  // #docregion evil-title
  htmlSnippet = 'Template <script>alert("0wned")</script>Syntax';
  // #enddocregion evil-title
}
