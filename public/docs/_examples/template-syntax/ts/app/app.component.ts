//#docplaster

import {Component} from 'angular2/core';
import {NgForm} from 'angular2/common';

import {Hero} from './hero';
import {HeroDetailComponent, BigHeroDetailComponent} from './hero-detail.component';
import {MyClickDirective, MyClickDirective2} from './my-click.directive';

// Alerter fn: monkey patch during test
export function alerter(msg?:string) {
  window.alert(msg);
}

export enum Color {Red, Green, Blue};

/**
 * Giant grab bag of stuff to drive the chapter
 */
@Component({
  selector: 'my-app',
  templateUrl: 'app/app.component.html',
  directives: [
    HeroDetailComponent, BigHeroDetailComponent,
    MyClickDirective, MyClickDirective2
  ]
})
export class AppComponent {

  actionName = 'Go for it';
  alert = alerter;
  badCurly = 'bad curly';
  callFax(value:string)   {this.alert(`Faxing ${value} ...`)}
  callPhone(value:string) {this.alert(`Calling ${value} ...`)}
  canSave =  true;

  Color = Color;
  color = Color.Red;
  colorToggle() {this.color = (this.color === Color.Red)? Color.Blue : Color.Red}

  currentHero = Hero.MockHeroes[0];

  // DevMode memoization fields
  private _priorClasses:{};
  private _priorStyles:{};
  private _priorStyles2:{};

  getStyles(el:Element){
    let styles = window.getComputedStyle(el);
    let showStyles = {};
    for (var p in this.setStyles()){
      showStyles[p] = styles[p];
    }
    return JSON.stringify(showStyles);
  }

  getVal() {return this.val};

  heroes = Hero.MockHeroes;

  // heroImageUrl = 'http://www.wpclipart.com/cartoon/people/hero/hero_silhoutte_T.png';
  // Public Domain terms of use: http://www.wpclipart.com/terms.html
  heroImageUrl = 'images/hero.png';

  //iconUrl = 'https://angular.io/resources/images/logos/standard/shield-large.png';
  iconUrl = 'images/ng-logo.png';
  isActive = false;
  isSpecial = true;
  isUnchanged = true;

  nullHero:Hero = null; // or undefined

  onCancel(event:KeyboardEvent){
    let evtMsg = event ? ' Event target is '+ (<HTMLElement>event.target).innerHTML : '';
    this.alert('Canceled.'+evtMsg)
  }

  onClickMe(event:KeyboardEvent){
    let evtMsg = event ? ' Event target class is '+ (<HTMLElement>event.target).className  : '';
    this.alert('Click me.'+evtMsg)
  }

  onHeroDeleted(hero:Hero){
    this.alert('Deleted hero: '+ (hero && hero.firstName))
  }

  onSave(event:KeyboardEvent){
    let evtMsg = event ? ' Event target is '+ (<HTMLElement>event.target).innerText : '';
    this.alert('Saved.'+evtMsg)
  }

  onSubmit(form:NgForm){
    let evtMsg = form.valid ?
      ' Form value is '+ JSON.stringify(form.value) :
      ' Form is invalid';
    this.alert('Form submitted.'+evtMsg)
  }

  product = {
    name: 'frimfram',
    price: 42
  };

  setUpperCaseFirstName(firstName:string){
    //console.log(firstName);
    this.currentHero.firstName = firstName.toUpperCase();
  }

  // #docregion setClasses
  setClasses() {
    let classes =  {
      saveable: this.canSave,      // true
      modified: !this.isUnchanged, // false
      special: this.isSpecial,     // true
    }
    // #enddocregion setClasses
    // compensate for DevMode (sigh)
    if (JSON.stringify(classes) === JSON.stringify(this._priorClasses)){
       return this._priorClasses;
    }
    this._priorClasses = classes;
    // #docregion setClasses
    return classes;
  }
  // #enddocregion setClasses


  // #docregion setStyles
  setStyles() {
    let styles = {
      // CSS property names
      'font-style':  this.canSave      ? 'italic' : 'normal',  // italic
      'font-weight': !this.isUnchanged ? 'bold'   : 'normal',  // normal
      'font-size':   this.isSpecial    ? '24px'   : '8px',     // 24px
    }
    // #enddocregion setStyles
    // compensate for DevMode (sigh)
    if (JSON.stringify(styles) === JSON.stringify(this._priorStyles)){
       return this._priorStyles;
    }
    this._priorStyles = styles;
    // #docregion setStyles
    return styles;
  }
  // #enddocregion setStyles

  toeChoice = '';
  toeChooser(picker:HTMLFieldSetElement){
    let choices = picker.children;
    for (let i=0; i<choices.length; i++){
      var choice = <HTMLInputElement>choices[i];
      if (choice.checked) {return this.toeChoice = choice.value}
    }
  }

  title = 'Template Syntax'
  val=2;
  //  villainImageUrl = 'http://www.clker.com/cliparts/u/s/y/L/x/9/villain-man-hi.png'
  // Public Domain terms of use http://www.clker.com/disclaimer.html
  villainImageUrl = 'images/villain.png'

}
