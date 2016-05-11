// #docregion
import 'dart:async';

import 'package:angular2/angular2.dart';

@Component(
    selector: 'hero-message',
    template: '''
      <h2>Async Hero Message and AsyncPipe</h2>
      <p>Message: {{ message | async }}</p>
      <button (click)="resend()">Resend</button>
    ''')
class HeroAsyncMessageComponent {
  static const DELAY = const Duration(milliseconds: 500);

  Stream<String> message;

  HeroAsyncMessageComponent() {
    resend();
  }

  void resend() {
    message = new Stream.periodic(DELAY, (i) => _msgs[i]).take(_msgs.length);
  }

  List<String> _msgs = <String>[
    'You are my hero!',
    'You are the best hero!',
    'Will you be my hero?'
  ];
}
