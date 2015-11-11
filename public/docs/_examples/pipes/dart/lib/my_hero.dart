library pipe_examples.my_hero;

import 'dart:async';

import 'package:angular2/angular2.dart';

@Component(selector: 'my-hero')
@View(
    template: '''
<p>Message: {{delayedMessage | async}}</p>
''')
class MyHero {
  Future<String> delayedMessage =
      new Future.delayed(new Duration(milliseconds: 500), () {
    return 'You are my Hero!';
  });
}
