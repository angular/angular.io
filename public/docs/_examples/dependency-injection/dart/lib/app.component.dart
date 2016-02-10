// #docplaster

// #docregion

// #docregion imports
import "package:angular2/core.dart";
import "car";
import "heroes";
import "app.config.dart";
import "logger.service.dart";
import "user.service.dart";
// #enddocregion imports
import "injector.component.dart";
import "test.component.dart";
import "providers.component.dart";

@Component(
    selector: "my-app",
    template: '''
    <h1>{{title}}</h1>
    <my-car></my-car>
    <my-injectors></my-injectors>
    <my-tests></my-tests>
    <h2>User</h2>
    <p id="user">
      {{userInfo}}
      <button (click)=\'nextUser()\'>Next User</button>
    <p>
    <my-heroes id="authorized" *ngIf="isAuthorized"></my-heroes>
    <my-heroes id="unauthorized" *ngIf="!isAuthorized"></my-heroes>
  ''',
    directives: const [
      CarComponent,
      HeroesComponent,
      InjectorComponent,
      TestComponent,
      ProvidersComponent
    ],
// #docregion providers
    providers: const [
      Logger,
      UserService,
      const Provider(Config, useValue: CONFIG)
    ]
// #enddocregion providers
)
class AppComponent {
  UserService _userService;
  String title;
  //#docregion ctor
  AppComponent(Config config, this._userService) {
    title = config.title;
  }
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

  String get userInfo {
    return '''Current user, ${user.name}, is ''' +
        '''${ isAuthorized ? "" : "not"} authorized. ''';
  }
}
// #enddocregion
