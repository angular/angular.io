// #docregion
import 'dart:convert';
import 'dart:html';

import 'package:angular2/core.dart';
import 'package:angular2/common.dart';

import 'hero.dart';
import 'hero_detail_component.dart';
import 'my_click_directive.dart';

enum Color { red, green, blue }

@Component(
    selector: 'my-app',
    templateUrl: 'app_component.html',
    directives: const [
      HeroDetailComponent,
      BigHeroDetailComponent,
      MyClickDirective,
      MyClickDirective2
    ])
class AppComponent implements OnInit, AfterViewInit {
  @override
  void ngOnInit() {
    refreshHeroes();
  }

  @override
  void ngAfterViewInit() {
    _detectNgForTrackByEffects();
  }

  String heroName;
  String help;
  String actionName = 'Go for it';
  String badCurly = 'bad curly';
  String classes = 'special';
  bool canSave = true;
  bool isActive = false;
  bool isSpecial = true;
  bool isUnchanged = true;
  bool isSelected = false;
  final Color colorRed = Color.red;
  Color color = Color.red;
  var colorEnum = Color;

  List<Hero> heroes;
  Hero currentHero;

  // #docregion refresh-heroes
  /// Updates [this.heroes] with fresh set of cloned heroes.
  void refreshHeroes() {
    heroes = mockHeroes.map((hero) => hero.clone()).toList();
    currentHero = heroes[0];
  }
  // #enddocregion refresh-heroes

  final Hero nullHero = null;
  Map product = {'name': 'frimfram', 'price': 42};
  FormElement form;
  String clicked = '';
  String clickMessage = '';
  String clickMessage2 = '';
  final String iconUrl = 'assets/images/ng-logo.png';

  // heroImageUrl = 'http://www.wpclipart.com/cartoon/people/hero/hero_silhoutte_T.png';
  // Public Domain terms of use: http://www.wpclipart.com/terms.html
  final String heroImageUrl = 'assets/images/hero.png';

  // villainImageUrl = 'http://www.clker.com/cliparts/u/s/y/L/x/9/villain-man-hi.png'
  // Public Domain terms of use http://www.clker.com/disclaimer.html
  final String villainImageUrl = 'assets/images/villain.png';

  void alerter(String msg) {
    window.alert(msg);
  }

  void callFax(String value) {
    alerter('Faxing $value ...');
  }

  void callPhone(String value) {
    alerter('Calling $value ...');
  }

  void colorToggle() {
    color = (color == Color.red) ? Color.blue : Color.red;
  }

  int getVal() => val;

  void onCancel(UIEvent event) {
    HtmlElement el = event?.target;
    var evtMsg = event != null ? 'Event target is ${el.innerHtml}.' : '';
    alerter('Canceled. $evtMsg');
  }

  void onClickMe(UIEvent event) {
    HtmlElement el = event?.target;
    var evtMsg = event != null ? 'Event target class is ${el.className}.' : '';
    alerter('Click me. $evtMsg');
  }

  void deleteHero([Hero hero]) {
    alerter('Deleted hero: ${hero?.firstName}');
  }

  bool onSave([UIEvent event = null]) {
    HtmlElement el = event?.target;
    var evtMsg =
        event != null ? ' Event target is ${el.innerHtml}.' : '';
    alerter('Saved. $evtMsg');
    return false;
  }

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

  Map<String, bool> _previousClasses = {};
  // #docregion setClasses
  Map<String, bool> setClasses() {
    final classes = {
      'saveable': canSave, // true
      'modified': !isUnchanged, // false
      'special': isSpecial // true
    };
    // #docregion setClasses
    // compensate for DevMode (sigh)
    if (JSON.encode(_previousClasses) ==
        JSON.encode(classes)) return _previousClasses;
    _previousClasses = classes;
    // #enddocregion setClasses
    return classes;
  }
  // #enddocregion setClasses

  // #docregion setStyles
  Map setStyles() {
    return {
      'font-style': canSave ? 'italic' : 'normal', // italic
      'font-weight': !isUnchanged ? 'bold' : 'normal', // normal
      'font-size': isSpecial ? '24px' : '8px' // 24px
    };
  }
  // #enddocregion setStyles

  String title = 'Template Syntax';
  String toeChoice;
  String toeChooser(Element picker) {
    List<Element> choices = picker.children;
    for (var i = 0; i < choices.length; i++) {
      var choice = choices[i] as CheckboxInputElement;
      if (choice.checked) {
        toeChoice = choice.value;
        return toeChoice;
      }
    }

    return null;
  }

  // #docregion trackByHeroes
  int trackByHeroes(int index, Hero hero) => hero.id;
  // #enddocregion trackByHeroes

  // #docregion trackById
  int trackById(int index, dynamic item) => item.id;
  // #enddocregion trackById

  int val = 2;

  //////// Detect effects of NgForTrackBy ///////////////
  int heroesNoTrackByChangeCount = 0;
  int heroesWithTrackByChangeCount = 0;

  @ViewChildren('noTrackBy') QueryList<ElementRef> childrenNoTrackBy;
  @ViewChildren('withTrackBy') QueryList<ElementRef> childrenWithTrackBy;

  void _detectNgForTrackByEffects() {
    /// Converts [viewChildren] to a list of [Element].
    List<Element> _extractChildren(QueryList<ElementRef> viewChildren) =>
        viewChildren.toList()[0].nativeElement.children.toList() as List<Element>;

    {
      // Updates 'without TrackBy' statistics.
      List<Element> _oldNoTrackBy = _extractChildren(this.childrenNoTrackBy);

      this.childrenNoTrackBy.changes.listen((Iterable<ElementRef> changes) {
        final newNoTrackBy = _extractChildren(changes);
        final isSame = newNoTrackBy.fold(true, (bool isSame, Element elt) {
          return isSame && _oldNoTrackBy.contains(elt);
        });

        if (!isSame) {
          _oldNoTrackBy = newNoTrackBy;
          this.heroesNoTrackByChangeCount++;
        }
      });
    }

    {
      // Updates 'with TrackBy' statistics.
      List<Element> _oldWithTrackBy =
          _extractChildren(this.childrenWithTrackBy);

      this.childrenWithTrackBy.changes.listen((Iterable<ElementRef> changes) {
        final newWithTrackBy = _extractChildren(changes);
        final isSame = newWithTrackBy.fold(true, (bool isSame, Element elt) {
          return isSame && _oldWithTrackBy.contains(elt);
        });

        if (!isSame) {
          _oldWithTrackBy = newWithTrackBy;
          this.heroesWithTrackByChangeCount++;
        }
      });
    }
  }
  ///////////////////
}
