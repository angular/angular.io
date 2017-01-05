/* tslint:disable:forin member-ordering */
// #docplaster

import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Hero } from './hero';

// Alerter fn: monkey patch during test
export function alerter(msg?: string) {
  window.alert(msg);
}

export enum Color {Red, Green, Blue};

/**
 * Giant grab bag of stuff to drive the chapter
 */
@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: './app.component.html'
})
export class AppComponent implements AfterViewInit, OnInit {

  ngOnInit() {
    this.refreshHeroes();
    this.setCurrentClasses();
    this.setCurrentStyles();
  }

  ngAfterViewInit() {
    this.detectNgForTrackByEffects();
  }

  actionName = 'Go for it';
  alert = alerter;
  badCurly = 'bad curly';
  classes = 'special';

  callFax(value: string)   {this.alert(`Faxing ${value} ...`); }
  callPhone(value: string) {this.alert(`Calling ${value} ...`); }
  canSave =  true;

  Color = Color;
  color = Color.Red;
  colorToggle() {this.color = (this.color === Color.Red) ? Color.Blue : Color.Red; }

  currentHero = Hero.MockHeroes[0];

  deleteHero(hero: Hero) {
    this.alert('Deleted hero: ' + (hero && hero.firstName));
  }

  // #docregion evil-title
  evilTitle = 'Template <script>alert("evil never sleeps")</script>Syntax';
  // #enddocregion evil-title

  title = 'Template Syntax';

  getStyles(el: Element) {
    let styles = window.getComputedStyle(el);
    let showStyles = {};
    for (let p in this.currentStyles) { // only interested in these styles
      showStyles[p] = styles[p];
    }
    return JSON.stringify(showStyles);
  }

  getVal() { return this.val; }

  heroes: Hero[];

  // heroImageUrl = 'http://www.wpclipart.com/cartoon/people/hero/hero_silhoutte_T.png';
  // Public Domain terms of use: http://www.wpclipart.com/terms.html
  heroImageUrl = 'images/hero.png';

  // iconUrl = 'https://angular.io/resources/images/logos/standard/shield-large.png';
  clicked = '';
  clickMessage = '';
  clickMessage2 = '';
  iconUrl = 'images/ng-logo.png';
  isActive = false;
  isSpecial = true;
  isUnchanged = true;

  nullHero: Hero = null; // or undefined

  onCancel(event: KeyboardEvent) {
    let evtMsg = event ? ' Event target is ' + (<HTMLElement>event.target).innerHTML : '';
    this.alert('Canceled.' + evtMsg);
  }

  onClickMe(event: KeyboardEvent) {
    let evtMsg = event ? ' Event target class is ' + (<HTMLElement>event.target).className  : '';
    this.alert('Click me.' + evtMsg);
  }

  onSave(event: KeyboardEvent) {
    let evtMsg = event ? ' Event target is ' + (<HTMLElement>event.target).innerText : '';
    this.alert('Saved.' + evtMsg);
  }

  onSubmit(form: NgForm) {
    let evtMsg = form.valid ?
      ' Form value is ' + JSON.stringify(form.value) :
      ' Form is invalid';
    this.alert('Form submitted.' + evtMsg);
  }

  product = {
    name: 'frimfram',
    price: 42
  };

  // #docregion refresh-heroes
  // update this.heroes with fresh set of cloned heroes
  refreshHeroes() {
    this.heroes = Hero.MockHeroes.map(hero => Hero.clone(hero));
  }
  // #enddocregion refresh-heroes

  // #docregion same-as-it-ever-was
  private samenessCount = 5;
  moreOfTheSame() { this.samenessCount++; };
  get sameAsItEverWas() {
    let result: string[] = Array(this.samenessCount);
    for ( let i = result.length; i-- > 0; ) { result[i] = 'same as it ever was ...'; }
    return result;
    // return [1,2,3,4,5].map(id => {
    //   return {id:id, text: 'same as it ever was ...'};
    // });
  }
  // #enddocregion same-as-it-ever-was

  setUpperCaseFirstName(firstName: string) {
    // console.log(firstName);
    this.currentHero.firstName = firstName.toUpperCase();
  }

  // #docregion setClasses
  currentClasses: {};
  setCurrentClasses() {
    // CSS classes: added/removed per current state of component properties
    this.currentClasses =  {
      saveable: this.canSave,
      modified: !this.isUnchanged,
      special:  this.isSpecial
    };
  }
  // #enddocregion setClasses

  // #docregion setStyles
  currentStyles: {};
  setCurrentStyles() {
    this.currentStyles = {
      // CSS styles: set per current state of component properties
      'font-style':  this.canSave      ? 'italic' : 'normal',
      'font-weight': !this.isUnchanged ? 'bold'   : 'normal',
      'font-size':   this.isSpecial    ? '24px'   : '12px'
    };
  }
  // #enddocregion setStyles

  toeChoice = '';
  toeChooser(picker: HTMLFieldSetElement) {
    let choices = picker.children;
    for (let i = 0; i < choices.length; i++) {
      let choice = <HTMLInputElement>choices[i];
      if (choice.checked) {return this.toeChoice = choice.value; }
    }
  }

  // #docregion trackByHeroes
  trackByHeroes(index: number, hero: Hero) { return hero.id; }
  // #enddocregion trackByHeroes

  // #docregion trackById
  trackById(index: number, item: any): string { return item['id']; }
  // #enddocregion trackById

  val = 2;
  // villainImageUrl = 'http://www.clker.com/cliparts/u/s/y/L/x/9/villain-man-hi.png'
  // Public Domain terms of use http://www.clker.com/disclaimer.html
  villainImageUrl = 'images/villain.png';


  //////// Detect effects of NgForTrackBy ///////////////
  @ViewChildren('noTrackBy') childrenNoTrackBy: QueryList<ElementRef>;
  @ViewChildren('withTrackBy') childrenWithTrackBy: QueryList<ElementRef>;

  private _oldNoTrackBy: HTMLElement[];
  private _oldWithTrackBy: HTMLElement[];

  heroesNoTrackByChangeCount = 0;
  heroesWithTrackByChangeCount = 0;

  private detectNgForTrackByEffects() {
    this._oldNoTrackBy   = toArray(this.childrenNoTrackBy);
    this._oldWithTrackBy = toArray(this.childrenWithTrackBy);

    this.childrenNoTrackBy.changes.subscribe((changes: any) => {
      let newNoTrackBy = toArray(changes);
      let isSame = this._oldNoTrackBy.every((v: any, i: number) => v === newNoTrackBy[i]);
      if (!isSame) {
        this._oldNoTrackBy = newNoTrackBy;
        this.heroesNoTrackByChangeCount++;
      }
    });

    this.childrenWithTrackBy.changes.subscribe((changes: any) => {
      let newWithTrackBy = toArray(changes);
      let isSame = this._oldWithTrackBy.every((v: any, i: number) => v === newWithTrackBy[i]);
      if (!isSame) {
        this._oldWithTrackBy = newWithTrackBy;
        this.heroesWithTrackByChangeCount++;
      }
    });
  }
  ///////////////////

}

// helper to convert viewChildren to an array of HTMLElements
function toArray(viewChildren: QueryList<ElementRef>) {
  let result: HTMLElement[] = [];
  let children = viewChildren.toArray()[0].nativeElement.children;
  for (let i = 0; i < children.length; i++) { result.push(children[i]); }
  return result;
}
