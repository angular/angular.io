import 'dart:async';

import 'package:angular2/angular2.dart';

@Component(
    selector: 'hero-message', template: 'Message: {{delayedMessage | async}}')
class HeroAsyncMessageComponent {
  Future<String> delayedMessage =
      new Future.delayed(new Duration(milliseconds: 500), () {
    return 'You are my Hero!';
  });
}
