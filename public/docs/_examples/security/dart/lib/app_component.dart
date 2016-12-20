// #docregion
import 'package:angular2/core.dart';

import 'bypass_security_component.dart';
import 'inner_html_binding_component.dart';

@Component(
    selector: 'my-app',
    template: '''
      <h1>Security</h1>
      <inner-html-binding></inner-html-binding>
      <bypass-security></bypass-security>
    ''',
    directives: const [
      BypassSecurityComponent,
      InnerHtmlBindingComponent,
    ])
class AppComponent {}
