// #docregion

// #docregion imports
import "package:angular2/core.dart";
import "car";
import "heroes";
import "package:angular2/core.dart";
import "app.config.dart";
import "logger.service.dart";

// #enddocregion imports
@Component(
    selector: "my-app",
    template: '''
    <h1>{{title}}</h1>
    <my-car></my-car>
    <my-heroes></my-heroes>
  ''',
    directives: const [
      CarComponent,
      HeroesComponent
    ],
    providers: const [
      Logger,
      // #docregion provider-config
      const Provider("app.config", useValue: CONFIG)
    ])
class AppComponent {
  String title;
  // #docregion ctor
  AppComponent(@Inject("app.config") Config config) {
    title = config.title;
  }
}
// #enddocregion
