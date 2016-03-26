// #docregion
import {Component,Input,OnInit} from 'angular2/core';
import {Hero}                   from './hero';
import {HeroService}            from './hero.service';

@Component({
  selector:'bio',
  template:`<h4>{{hero.name}}</h4>
            <div>
              <ng-content></ng-content> 
              <textarea cols="25" [(ngModel)]="hero.description">{{hero.description}}</textarea>
            </div>`,
  providers:[HeroService]
})

export class Bio implements OnInit{
  
  @Input() heroIndex:number;
  private hero:Hero;
  
  constructor(private _heroService:HeroService){
  }
  
  ngOnInit(){
    this.hero = this._heroService.getHeroById(this.heroIndex);
  } 
}