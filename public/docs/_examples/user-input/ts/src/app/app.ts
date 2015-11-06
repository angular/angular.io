// #docplaster

// imports formatted for dev guide only
// #docregion little-tour-of-heroes-app
import {bootstrap, Component, CORE_DIRECTIVES} from 'angular2/angular2';
 
// #enddocregion little-tour-of-heroes-app


// #docregion click-me-component
@Component({
  selector: 'click-me',
  template: '<button (click)="onClickMe()">Click me</button>'
})
class ClickMeComponent {
  onClickMe(){
    alert('You are my hero!')    
  }
}
// #enddocregion click-me-component

// #docregion loop-back-component
@Component({
  selector: 'loop-back',
  template: '<input #box (keyup)="0"> <p>{{box.value}}</p>'
})
class LoopbackComponent {
}
// #enddocregion loop-back-component

// #docregion key-up-component
@Component({
  selector: 'key-up',
  template: `
    <h4>Give me some keys!</h4>
    <div><input (keyup)="onKey($event)"></div>
    <div>{{values}}</div>
  `
})
class KeyUpComponent {
  values='';
  onKey(event) {
    this.values += event.target.value + ' | ';  
  }
}
// #enddocregion key-up-component

// #docregion key-up2-component
@Component({
  selector: 'key-up2',
  template: `
    <h4>Give me some more keys!</h4>
    <div><input #box (keyup)="onKey(box.value)"></div>
    <div>{{values}}</div>
  `
})
class KeyUpComponentV2 {
  values='';
  onKey(value) {
    this.values += value + ' | ';  
  }
}
// #enddocregion key-up2-component


// #docregion key-up3-component
@Component({
  selector: 'key-up3',
  template: `
    <h4>Type away! Press [enter] when done.</h4>
    <div><input #box (keyup.enter)="values=box.value"></div>
    <div>{{values}}</div>
  `
})
class KeyUpComponentV3 {
  values='';
}
// #enddocregion key-up3-component


// #docregion key-up4-component
@Component({
  selector: 'key-up4',
  template: `
    <h4>Type away! Press [enter] or mouse away when done.</h4>
    <div>
      <input #box 
        (keyup.enter)="values=box.value" 
        (blur)="values=box.value">
    <div>
    <div>{{values}}</div>
  `
})
class KeyUpComponentV4 {
  values='';
}
// #enddocregion key-up4-component


@Component({
  selector: 'my-app',
  templateUrl: 'app/app.html',
  directives: [
    CORE_DIRECTIVES,
    ClickMeComponent, 
    KeyUpComponent, KeyUpComponentV2, KeyUpComponentV3, KeyUpComponentV4, 
    LoopbackComponent,
  ]
})
class AppComponent { 

  onClickMe(event){
    let evtMsg = event ? ' Event target class is '+ event.target.className  : '';
    alert('Click me.'+evtMsg)    
  }
}

bootstrap(AppComponent);

///////////////////////////////////////////////////

// #docregion little-tour-of-heroes-app
@Component({
  selector: 'little-tour',
  template: `
    <h4>Little Tour of Heroes</h4>
    <input #new-hero 
      (keyup.enter)="addHero(newHero)"
      (blur)="addHero(newHero)">
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
// #enddocregion little-tour-of-heroes-app
