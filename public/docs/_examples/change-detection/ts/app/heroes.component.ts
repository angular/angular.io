// #docregion
import {Component, ChangeDetectionStrategy, ChangeDetectorRef} from 'angular2/core';

// #docregion heroes

// Base class for all Heroes class variations
export class HeroesBase {
   modify = true;
   constructor(startTicking = false){
     if (startTicking) {
       setInterval(()=>this.onTick(), 1000 );
     }
     this.ticking = startTicking;
  }

  cnt = 1;
  orig = ['Windstorm', 'Bombasto', 'Magneta', 'Tornado'];
  heroes= this.orig.slice();
  resetCount = 0;
  resetCountdown = 10;
  ticking = false;

  addHero(newHero:string) {
    if (newHero) {
      this.heroes.push(newHero);
    }
  }

  onTick() {
    this.resetCountdown--;
    if (this.resetCountdown === 0) {
       this.resetCountdown = 10;
       this.resetCount++;
       this.heroes = this.orig.slice();
       return;
    }

    if (this.modify) {
      // modify items within the array
      let c = this.cnt++;
      this.orig.forEach((h,i) => this.heroes[i] = h+c);
    } else {
      // add-or-remove instead
      let ix = this.heroes.indexOf('foo');
      if (ix === -1) {
        this.heroes.push('foo');
      } else {
        this.heroes.splice(ix, 1);
      }
    }
    this.modify = !this.modify;
  }
}

////////////
@Component({
  selector: 'heroes-default',
  templateUrl: 'app/heroes.component.html'
})
export class HeroesComponent extends HeroesBase {
  title="Default change detection";
}

////////////
@Component({
  selector: 'heroes-tick',
  templateUrl: 'app/heroes.component.html'
})
export class HeroesComponentTicking extends HeroesBase {
  constructor(){ super(true); }
  title="Ticking with default change detection";
}

/////////////
@Component({
  selector: 'heroes-on-push',
  templateUrl: 'app/heroes.component.html',
  // ChangeDetectionStrategy.OnPush
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroesOnPushComponent extends HeroesBase {
  constructor(){ super(true); }
  title="Ticking with 'OnPush' change detection";
}

/////////////
@Component({
  selector: 'heroes-cd',
  templateUrl: 'app/heroes.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroesChangeDetectorComponent extends HeroesBase {
  constructor(private _cd: ChangeDetectorRef){ super(true); }
  title="Ticking with 'OnPush' change detection and calling 'markForCheck' ";
  onTick() {
    super.onTick();
    this._cd.markForCheck();
  }
}

// #enddocregion heroes
