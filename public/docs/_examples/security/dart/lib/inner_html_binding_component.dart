// #docregion
import 'package:angular2/core.dart';

@Component(
    selector: 'inner-html-binding',
    templateUrl: 'inner_html_binding_component.html')
// #docregion class
class InnerHtmlBindingComponent {
  // E.g. a user/attacker controlled value from a URL.
  var htmlSnippet = 'Template <script>alert("0wned")</script> <b>Syntax</b>';
}
