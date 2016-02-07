// #docregion
import 'dart:convert';
import 'dart:html';

import 'package:angular2/angular2.dart';

import 'hero.dart';
import 'hero_detail_component.dart';
import 'my_click_directive.dart';

enum Color { Red, Green, Blue }

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
//  String badCurly = 'special'; // XXX: This isn't working.
//  String badCurly = 'bad, curly'; // XXX: This isn't working.
//  String badCurly = 'bad curly'; // XXX: This isn't working.
  String badCurly = 'bad'; // XXX: This isn't working.
//  List<String> badCurly = ['bad', 'curly']; // XXX: This isn't working.
  bool canSave = true;
  bool isActive = false;
  bool isSpecial = true;
  bool isUnchanged = true;
  bool isSelected = false;
  Color color = Color.Red;
  List<Hero> heroes = Hero.MockHeroes;
  Hero selectedHero = Hero.MockHeroes[0];
  Hero currentHero = Hero.MockHeroes[0];
  final Hero nullHero = null;
  Map product = {'name': 'frimfram', 'price': 42};
  FormElement form;
  String clickity = '';
  String clickMessage = '';
  String clickMessage2 = '';
  final String iconUrl = 'assets/images/ng-logo.png';

  // heroImageUrl = 'http://www.wpclipart.com/cartoon/people/hero/hero_silhoutte_T.png';
  // Public Domain terms of use: http://www.wpclipart.com/terms.html
  final String heroImageUrl = 'assets/images/hero.png';

  // villainImageUrl = 'http://www.clker.com/cliparts/u/s/y/L/x/9/villain-man-hi.png'
  // Public Domain terms of use http://www.clker.com/disclaimer.html
  final String villainImageUrl = 'assets/images/villain.png';

  // #docregion setClasses
  Map classes = {
    'saveable': false,
    'modified': false,
    'special': false
  };
  // #enddocregion setClasses

  // #docregion setStyles
  Map styles = {
    'font-style': 'normal',
    'font-weight': 'normal',
    'font-size': 'smaller'
  };
  // #enddocregion setStyles

  Map styles2 = {
    'fontStyle': 'normal',
    'fontWeight': 'normal',
    'fontSize': 'smaller'
  };

  void alerter(String msg) => window.alert(msg);
  void callFax(String value) => alerter('Faxing $value ...');
  void callPhone(String value) => alerter('Calling $value ...');
  void colorToggle() {
    color = (color == Color.Red) ? Color.Blue : Color.Red;
  }

  int getVal() => val;

  void onCancel(MouseEvent event) {
    DivElement el = event.target;
    var evtMsg = event != null ? 'Event target is ${el.innerHtml}.' : '';
    alerter('Canceled. $evtMsg');
  }

  void onClickMe(MouseEvent event) {
    DivElement el = event.target;
    var evtMsg = event != null ? 'Event target class is ${el.className}.' : '';
    alerter('Click me. $evtMsg');
  }

  bool onSave([MouseEvent event = null]) {
    var evtMsg =
        event != null ? ' Event target is ${event.target.innerHtml}.' : '';
    alerter('Saved. $evtMsg');
    return false;
  }

  void onHeroDeleted([Hero hero]) => alerter('Deleted hero: ${hero?.firstName}');

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

  // #docregion setClasses
  Map setClasses() {
    classes['saveable'] = canSave;      // true
    classes['modified'] = !isUnchanged; // false
    classes['special'] = isSpecial;     // true

    return classes;
  }
  // #enddocregion setClasses

  // #docregion setStyles
  Map setStyles() {
    styles['font-style'] = canSave ? 'italic' : 'normal';     // italic
    styles['font-weight'] = !isUnchanged ? 'bold' : 'normal'; // normal
    styles['font-size'] = isSpecial ? '24px' : '8px';         // 24px
    return styles;
  }
  // #enddocregion setStyles

  String title = 'Template Syntax';
  String toeChoice;
  String toeChooser(Element picker) {
    List<Element> choices = picker.children;
    for (var i = 0; i < choices.length; i++) {
      var choice = choices[i];
      if (choice.checked) {
        toeChoice = choice.value;
        return toeChoice;
      }
    }
  }

  // #docregion trackByHeroes
  int trackByHeroes(int index, Hero hero) { return hero.id; }
  // #enddocregion trackByHeroes

  // #docregion trackById
  int trackById(int index, Map item): string { return item['id']; }
  // #enddocregion trackById

  int val = 2;


  //////// Detect effects of NgForTrackBy ///////////////
  int heroesNoTrackByChangeCount = 0;
  int heroesWithTrackByChangeCount = 0;
  /*
   // Convert to Dart
  @ViewChildren('noTrackBy') childrenNoTrackBy:QueryList<ElementRef>;
  @ViewChildren('withTrackBy') childrenWithTrackBy:QueryList<ElementRef>;

  private _oldNoTrackBy:HTMLElement[];
  private _oldWithTrackBy:HTMLElement[];

  private _detectNgForTrackByEffects() {
    this._oldNoTrackBy   = toArray(this.childrenNoTrackBy);
    this._oldWithTrackBy = toArray(this.childrenWithTrackBy);

    this.childrenNoTrackBy.changes.subscribe((changes:any) => {
      let newNoTrackBy = toArray(changes);
      let isSame = this._oldNoTrackBy.every((v:any, i:number) => v === newNoTrackBy[i]);
      if (!isSame) {
        this._oldNoTrackBy = newNoTrackBy;
        this.heroesNoTrackByChangeCount++;
      }
    })

    this.childrenWithTrackBy.changes.subscribe((changes:any) => {
      let newWithTrackBy = toArray(changes);
      let isSame = this._oldWithTrackBy.every((v:any, i:number) => v === newWithTrackBy[i]);
      if (!isSame) {
        this._oldWithTrackBy = newWithTrackBy;
        this.heroesWithTrackByChangeCount++;
      }
    })
  }
  */
  ///////////////////
}
