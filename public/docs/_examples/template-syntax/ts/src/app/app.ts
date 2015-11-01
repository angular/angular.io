// NOT EVERYTHING IS NEEDED BY TEMPLATE-SYNTAX CHAPTER
// Much left-over from support for "User Input" chapter such as
//   ClickMeComponent, 
//   KeyUpComponent, KeyUpComponentV2, KeyUpComponentV3, 
//   LittleTour, LoopbackComponent,
// TODO: purge extraneous material


/// #docplaster

import {bootstrap, Component, CORE_DIRECTIVES,
  Input, Output,
  Directive, 
  ElementRef, EventEmitter,
  FORM_DIRECTIVES
} from 'angular2/angular2';

class Hero {
  public id:number
  
  constructor(
    public firstName:string, 
    public lastName?:string, 
    public birthdate?:Date,
    public url?:string,
    public rate:number = 100) {
      this.id = Hero.nextId++;
    }

  get fullName() {return `${this.firstName} ${this.lastName}`;}
  
  static nextId = 1;
  
  static MockHeroes = [
    new Hero(
      'Hercules', 
      'Son of Zeus', 
      new Date(1970, 1, 25),
      'http://www.imdb.com/title/tt0065832/',
      325),
    
    new Hero('eenie', 'toe'),
    new Hero('Meanie', 'Toe'),
    new Hero('Miny', 'Toe'),
    new Hero('Moe', 'Toe')
  ];
}

// for fun; not used (yet)
@Directive({selector: 'select'})
class DecoratorDirective {
  constructor(el: ElementRef){
    console.log(el)
  }
}

@Component({
  selector: 'hero-detail',
  /*
  inputs: ['hero'],
  outputs: ['deleted'],
  */
  template: `
  <div style="border: 1px solid black; padding:3px">
    <div><b>Hero Detail: {{hero?.fullName}}</b></div>
    <div>First: {{hero?.firstName}}</div>
    <div>Last: {{hero?.lastName}}</div>
    <div>Birthdate: {{hero?.birthdate | date:'longDate'}}</div>
    <div>Web: <a href="{{hero?.url}}" target="_blank">{{hero?.url}}</a></div>
    <div>Rate/hr: {{hero?.rate | currency:'EUR'}}</div>    
    <button (click)="onDelete()">Delete</button>
  </div>
  `
})
class HeroDetailComponent {

  @Input()
  hero: Hero;
  
  @Output()
  deleted = new EventEmitter();
  
  onDelete() {
    this.deleted.next(this.hero);
  }
}

@Component({
  selector: 'little-hero',
  template: '<div>{{hero?.fullName}}</div>'
})
class LittleHeroComponent {
  @Input()
  hero: Hero;
}

@Component({
  selector: 'click-me',
  template: '<button (click)="onClickMe()">Click me</button>'
})
class ClickMeComponent {
  onClickMe(){
    alert('You are my hero!')    
  }
}

@Component({
  selector: 'loop-back',
  template: '<input #box (keyup)="0"> <p>{{box.value}}</p>'
})
class LoopbackComponent {
}

@Component({
  selector: 'key-up',
  template: `
    <h4>Give me some keys!</h4>
    <div><input (keyup)="onKey($event)"><div>
    <div>{{values}}</div>
  `
})
class KeyUpComponent {
  values='';
  onKey(event) {
    this.values += event.target.value + ' | ';  
  }
}

@Component({
  selector: 'key-up2',
  template: `
    <h4>Give me some more keys!</h4>
    <div><input #box (keyup)="onKey(box.value)"><div>
    <div>{{values}}</div>
  `
})
class KeyUpComponentV2 {
  values='';
  onKey(value) {
    this.values += value + ' | ';  
  }
}

@Component({
  selector: 'key-up3',
  template: `
    <h4>Type away! Press [enter] when done.</h4>
    <div><input #box (keyup.enter)="values=box.value"><div>
    <div>{{values}}</div>
  `
})
class KeyUpComponentV3 {
  values='';
}

@Component({
  selector: 'little-tour',
  template: `
    <h4>Little Tour of Heroes</h4>
    <input #new-hero (keyup.enter)="addHero(newHero)">
    <button (click)=addHero(newHero)>Add</button>
    <ul><li *ng-for="#hero of heroes">{{hero}}</li></ul>
  `,
  directives: [CORE_DIRECTIVES]
})
class LittleTour {
  heroes=['Windstorm', 'Bombasto', 'Magneta', 'Tornado'];
  
  addHero(newHero) {
    if (newHero.value) { 
      this.heroes.push(newHero.value); 
      newHero.value = null; // clear the newHero textbox
    }
  }
}

bootstrap(LittleTour);

@Component({
  selector: 'my-app',
  templateUrl: 'app/app.html',
  directives: [
    CORE_DIRECTIVES, FORM_DIRECTIVES,
    ClickMeComponent, 
    KeyUpComponent, KeyUpComponentV2, KeyUpComponentV3, 
    LittleTour, LoopbackComponent,
    HeroDetailComponent, LittleHeroComponent
  ]
})
class AppComponent { 

  actionName = 'Go for it';
  callFax(value:string) {alert(`Faxing ${value} ...`)}
  callPhone(value:string) {alert(`Calling ${value} ...`)}
  canSave =  true;
  
  currentHero = Hero.MockHeroes[0];
  
  getStyles(el){
    let styles = window.getComputedStyle(el);
    let showStyles = {};
    for (var p in this.setStyles()){
      showStyles[p] = styles[p];
    }
    return JSON.stringify(showStyles);
  }
  
  getVal() {return this.val};
  
  heroes = Hero.MockHeroes;
  
  //heroImageUrl = 'http://www.wpclipart.com/cartoon/people/hero/hero_silhoutte_T.png';
  heroImageUrl = '../../images/hero.png';
  
  //iconUrl = 'https://angular.io/resources/images/logos/standard/shield-large.png';
  iconUrl = '../../images/ng-logo.png';
  isActive = false;
  isSpecial = true;
  isUnchanged = true;
    
  nullHero:Hero = null; // or undefined
  
  onCancel(event){
    let evtMsg = event ? ' Event target is '+ event.target.innerHTML : '';
    alert('Canceled.'+evtMsg)
  }
  
  onClickMe(event){
    let evtMsg = event ? ' Event target class is '+ event.target.className  : '';
    alert('Click me.'+evtMsg)    
  }
  
  onDeleted(hero){
    alert('Deleted hero: '+ (hero && hero.firstName))
  }
  
  onSave(event){
    let evtMsg = event ? ' Event target is '+ event.target.innerText : '';
    alert('Saved.'+evtMsg)
  }
  
  onSubmit(form){
    let evtMsg = form.valid ? 
      ' Form value is '+ JSON.stringify(form.value) : 
      ' Form is invalid';
    alert('Form submitted.'+evtMsg)
  }
  
  product = {
    name: 'frimfram',
    price: 42
  };
  
  setLastName(event){
    console.log(event);
    this.currentHero.lastName = event;
  }
  
  setClasses() {
    return {
      saveable: this.canSave,      // true
      modified: !this.isUnchanged, // false
      special: this.isSpecial,     // true
    }
  }
  
  setStyles() {
    return {
      'font-style':  this.canSave      ? 'italic' : 'normal',  // italic
      'font-weight': !this.isUnchanged ? 'bold'   : 'normal',  // normal
      'font-size':   this.isSpecial    ? 'larger' : 'smaller', // larger
    }
  }
    
  toeChoice(picker){
    let choices = picker.children;
    for (let i=0; i<choices.length; i++){
      if (choices[i].checked) {return choices[i].value}
    }
  }
  
  title = 'Template Syntax'
  val=2;
  //  villainImageUrl = 'http://www.clker.com/cliparts/u/s/y/L/x/9/villain-man-hi.png'
  villainImageUrl = '../../images/villain.png'
  

}

bootstrap(AppComponent);
