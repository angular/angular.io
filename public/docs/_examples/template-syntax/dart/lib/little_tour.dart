library template_syntax.little_tour;

import 'dart:html';

import 'package:angular2/angular2.dart';

@Component(selector: 'little-tour')
@View(
    template: '''<h4>Little Tour of Heroes</h4>
    <input #new-hero
      (keyup.enter)="addHero(newHero)"
      (blur)="addHero(newHero)">
    <button (click)=addHero(newHero)>Add</button>
    <ul><li *ng-for="#hero of heroes">{{hero}}</li></ul>''',
    directives: const [CORE_DIRECTIVES, FORM_DIRECTIVES])
class LittleTourComponent {
  List<String> heroes = ['Windstorm', 'Bombasto', 'Magneta', 'Tornado'];

  addHero(InputElement newHero) {
    print(newHero.runtimeType);
    if (newHero.value != null && newHero.value.length > 0) {
      heroes.add(newHero.value);
      newHero.value = null;
    }
  }
}
