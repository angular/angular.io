// #docregion
import {Component, Host, Optional, OnInit, ElementRef} from 'angular2/core';

import {HeroService} from './hero.service';

@Component({
  selector:'contact-details',
  template:'<div>Phone #: {{phoneNumber}}</div>'
})

export class ContactDetails implements OnInit{
  
  private phoneNumber:string;
  constructor(@Optional() @Host() private _heroService:HeroService, elementRef:ElementRef){
    let nativeElement = elementRef.nativeElement;
  }
  
  ngOnInit(){
    if(this._heroService){
      this.phoneNumber = this._heroService.currentHero.phone;
    }
  }
}