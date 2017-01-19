// lib/show_properties.dart
library displaying_data.show_properties;

import 'dart:async';

import 'package:angular2/angular2.dart';
import 'package:displaying_data/friends_service.dart';

@Component(selector: 'display', viewProviders: const [FriendsService])
@View(
    template: '''
<p>Current time: {{ time }}</p>
<p>My name: {{ myName }}</p>

<p>Friends:</p>
<ul>
   <li *ng-for="#name of friendNames">
      {{ name }}
   </li>
</ul>
<p *ng-if="friendNames.length > 3">You have many friends!</p>

''',
    directives: const [NgFor, NgIf])
class DisplayComponent {
  String myName = 'Alice';
  String time;
  Timer _timer;

  List<String> friendNames;

  DisplayComponent(FriendsService friendsService) {
    friendNames = friendsService.names;
    _updateTime(null);
    _timer = new Timer.periodic(new Duration(seconds: 1), _updateTime);
  }

  _updateTime(Timer _) {
    time = new DateTime.now().toString();
  }
}
