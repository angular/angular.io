library template_syntax.app_component;

import 'dart:html';
import 'dart:convert';

import 'package:angular2/angular2.dart';
import 'package:template_syntax/hero.dart';
import 'package:template_syntax/hero_detail_component.dart';
import 'package:template_syntax/click_me_component.dart';
import 'package:template_syntax/loop_back_component.dart';
import 'package:template_syntax/key_up_components.dart';
import 'package:template_syntax/little_hero.dart';

List<Hero> _MockHeroes = [
  new Hero('Hercules',
      lastName: 'Son of Zeus',
      birthdate: new DateTime(1970, 1, 25),
      url: 'http://www.imdb.com/title/tt0065832/',
      rate: 325),
  new Hero('eenie', lastName: 'toe'),
  new Hero('Meanie', lastName: 'Toe'),
  new Hero('Miny', lastName: 'Toe'),
  new Hero('Moe', lastName: 'Toe')
];

enum _Color { Red, Green, Blue }

@Component(selector: 'my-app')
@View(
    templateUrl: 'my-app.html',
    directives: const [
      CORE_DIRECTIVES,
      FORM_DIRECTIVES,
      HeroDetailComponent,
      ClickMeComponent,
      LoopBackComponent,
      KeyUpComponent,
      KeyUpComponentV2,
      KeyUpComponentV3,
      KeyUpComponentV4,
      LittleHeroComponent,
    ])
class AppComponent {
  List<Hero> heroes = _MockHeroes;
  Hero currentHero = _MockHeroes.first;
  Hero nullHero = null; // or undefined

  bool isUnchanged = true;
  bool isSpecial = true;
  bool isActive = false;
  bool canSave = true;
  int val = 2;
  dynamic color = _Color.Red;
  String title = 'Template Syntax';
  String actionName = 'Go for it';
  String heroImageUrl =
      'http://www.wpclipart.com/cartoon/people/hero/hero_silhoutte_T.png';
  String villainImageUrl =
      'http://www.clker.com/cliparts/u/s/y/L/x/9/villain-man-hi.png';
  String iconUrl =
      'https://angular.io/resources/images/logos/standard/shield-large.png';
  Map product = {'name': 'frimfram', 'price': 42};

  colorToggle() {
    color = color == _Color.Red ? _Color.Blue : _Color.Red;
  }

  getStyles(Element el) {
    var showStyles = this.setStyles();
    return JSON.encode(showStyles);
  }

  getVal() {
    return val;
  }

  onSave(event) {
    var evtMsg = event ? ' Event target is ' + event.target.innerText : '';
    window.alert('Saved.' + evtMsg);
  }

  onDeleted(hero) {
    window.alert('Deleted hero: ' + (hero.firstName));
  }

  onSubmit(NgForm form) {
    var evtMsg = form.valid
        ? ' Form value is ' + JSON.encode(form.value)
        : ' Form is invalid';
    window.alert('Form submitted.' + evtMsg);
  }

  setLastName(event) {
    this.currentHero.lastName = event;
  }

  setClasses() {
    return {
      'saveable': canSave, // true
      'modified': !isUnchanged, // false
      'special': isSpecial // true
    };
  }

  setStyles() {
    return {
      'font-style': canSave ? 'italic' : 'normal', // italic
      'font-weight': !isUnchanged ? 'bold' : 'normal', // normal
      'font-size': isSpecial ? 'larger' : 'smaller', // larger
    };
  }

  toeChoice(HtmlElement picker) {
    var choices = picker.children;
    for (var i = 0; i < choices.length; i++) {
      var choice = choices[i];
      if (choice.checked) {
        return choice.value;
      }
    }
  }
}
