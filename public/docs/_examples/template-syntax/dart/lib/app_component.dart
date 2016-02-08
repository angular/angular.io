// #docregion
library template_syntax.app_component;

import 'dart:html';
import 'dart:convert';

import 'package:angular2/angular2.dart';
import 'package:template_syntax/hero.dart';
import 'package:template_syntax/hero_detail_component.dart';
import 'package:template_syntax/my_click_directive.dart';

enum _Color { Red, Green, Blue }

@Component(
    selector: 'my-app',
    templateUrl: 'app_component.html',
    directives: const [
      HeroDetailComponent,
      BigHeroDetailComponent,
      MyClickDirective,
      MyClickDirective2
    ])
class AppComponent {
  String heroName;
  String help;
  String actionName = 'Go for it';
  String title = 'Template Syntax';
  String heroImageUrl = 'assets/images/hero.png';
  String villainImageUrl = 'assets/images/villain.png';
  String iconUrl = 'assets/images/ng-logo.png';
  String chosenToe;
  int val = 2;
  bool canSave = true;
  bool isActive = false;
  bool isSpecial = true;
  bool isUnchanged = true;
  bool isSelected = false;
  _Color color = _Color.Red;
  List<Hero> heroes = Hero.MockHeroes;
  Hero selectedHero = Hero.MockHeroes[0];
  Hero currentHero = Hero.MockHeroes[0];
  Hero nullHero = null;
  Map product = {'name': 'frimfram', 'price': 42};
  Event clickity;
  FormElement form;

  Map classes = {
    'saveable': false, // true
    'modified': false, // false
    'special': false // true
  };

  Map styles = {
    'font-style': 'normal',
    'font-weight': 'normal',
    'font-size': 'smaller'
  };

  Map styles2 = {
    'fontStyle': 'normal',
    'fontWeight': 'normal',
    'fontSize': 'smaller'
  };

  void alerter(String msg) => window.alert(msg);
  void callFax(String value) => alerter('Faxing $value ...');
  void callPhone(String value) => alerter('Calling $value ...');
  void colorToggle() {
    color = color == _Color.Red ? _Color.Blue : _Color.Red;
  }

  int get getVal => val;

  void onCancel(MouseEvent event) {
    DivElement el = event.target;
    var evtMsg = event != null ? 'Event target is ${el.innerHtml}' : '';
    alerter('Canceled. $evtMsg');
  }

  void onClickMe(MouseEvent event) {
    DivElement el = event.target;
    var evtMsg = event != null ? 'Event target class is ${el.className}' : '';
    alerter('Click me. $evtMsg');
  }

  bool onSave([MouseEvent event = null]) {
    var evtMsg =
        event != null ? ' Event target is ${event.target.innerHtml}' : '';
    alerter('Saved.$evtMsg');
    return false;
  }

  void onHeroDeleted(Hero hero) => alerter('Deleted hero: ${hero.firstName}');

  void onSubmit(NgForm form) {
    var evtMsg = form.valid
        ? ' Form value is ${JSON.encode(form.value)}'
        : ' Form is invalid';
    alerter('Form submitted. $evtMsg');
  }

  void setUpperCaseFirstName(String firstName) {
    currentHero.firstName = firstName.toUpperCase();
  }

  String getStyles(Element el) {
    var showStyles = setStyles();
    return JSON.encode(showStyles);
  }

  // #docregion setStyles
  Map setStyles() {
    styles['font-style'] = canSave ? 'italic' : 'normal';
    styles['font-weight'] = !isUnchanged ? 'bold' : 'normal';
    styles['font-size'] = isSpecial ? 'x-large' : 'smaller';
    return styles;
  }
  // #enddocregion setStyles

  // #docregion setStyles2
  Map setStyles2() {
    // camelCase style properties work too [PENDING: no, they don't]
    styles2['fontStyle'] = canSave ? 'italic' : 'normal';
    styles2['fontWeight'] = !isUnchanged ? 'bold' : 'normal';
    styles2['fontSize'] = isSpecial ? 'x-large' : 'smaller';
    return styles2;
  }
  // #enddocregion setStyles2

  Map setClasses() {
    classes['saveable'] = canSave;
    classes['modified'] = !isUnchanged;
    classes['special'] = isSpecial;

    return classes;
  }

  String toeChooser(Element picker) {
    List<Element> choices = picker.children;
    for (var i = 0; i < choices.length; i++) {
      var choice = choices[i];
      if (choice.checked) {
        chosenToe = choice.value;
        return chosenToe;
      }
    }
  }
}
