import 'package:angular2/core.dart';

import 'app_config.dart';
import 'car/car_component.dart';
import 'heroes/heroes_component.dart';
import 'logger_service.dart';
import 'user_service.dart';
import 'injector_component.dart';
import 'test_component.dart';
import 'providers_component.dart';

@Component(
    selector: 'my-app',
    template: '''
      <h1>{{title}}</h1>
      <my-car></my-car>
      <my-injectors></my-injectors>
      <my-tests></my-tests>
      <h2>User</h2>
      <p id="user">
        {{userInfo}}
        <button (click)="nextUser()">Next User</button>
      <p>
      <my-heroes id="authorized" *ngIf="isAuthorized"></my-heroes>
      <my-heroes id="unauthorized" *ngIf="!isAuthorized"></my-heroes>''',
    directives: const [
      CarComponent,
      HeroesComponent,
      InjectorComponent,
      TestComponent,
      ProvidersComponent
    ],
    // #docregion providers
    providers: const [
      Logger, UserService,
      const Provider(APP_CONFIG, useFactory: heroDiConfigFactory)]
    // #enddocregion providers
)
class AppComponent {
  final UserService _userService;
  final String title;

  // #docregion ctor
  AppComponent(@Inject(APP_CONFIG) AppConfig config, this._userService)
      : title = config.title;
  // #enddocregion ctor

  bool get isAuthorized {
    return user.isAuthorized;
  }

  void nextUser() {
    _userService.getNewUser();
  }

  User get user {
    return _userService.user;
  }

  String get userInfo => 'Current user, ${user.name}, is' +
    (isAuthorized ? '' : ' not') + ' authorized. ';
}
