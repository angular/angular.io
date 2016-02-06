// #docplaster

// #docregion

// #docregion imports
import "package:angular2/core.dart";
import "car/car.component.dart";
import "heroes/heroes.component.dart";
import "app.config.dart";
import "logger.service.dart";
import "user.service.dart";
// #enddocregion imports
import "injector.component.dart";
import "test.component.dart";
import "providers.component.dart";

Provider _provideAppConfigUseValueConfig() => provide(APP_CONFIG, useValue: CONFIG);

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
      _provideAppConfigUseValueConfig
    ]
// #enddocregion providers
)
class AppComponent {
  UserService _userService;
  String title;
  //#docregion ctor
  AppComponent(@Inject(APP_CONFIG) Config config, this._userService) {
    title = config.title;
  }
  // #enddocregion ctor
  get isAuthorized {
    return user.isAuthorized;
  }

  nextUser() {
    _userService.getNewUser();
  }

  get user {
    return _userService.user;
  }

  get userInfo {
    return '''Current user, ${ this . user . name}, is ''' +
        '''${ this . isAuthorized ? "" : "not"} authorized. ''';
  }
}
// #enddocregion
