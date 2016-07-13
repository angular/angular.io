// #docregion
import { Component } from '@angular/core'
import { NgForm }    from '@angular/forms';

import { HighlightDirective } from './highlight.directive'
import { UserService }        from '../user.service';

@Component({
  moduleId: module.id,
  selector: 'app-contacts',
  templateUrl: 'contact.component.html',
  styleUrls: ['contact.component.css']
})
export class ContactComponent {
  model = {name: 'Chuck Overstreet'};
  msg = '';
  userName = '';

  constructor(userService: UserService){
    this.userName = userService.userName;
  }

  onSubmit() {
    // Todo: something
    this.setMessage("Saved "+ this.model.name);
  }

  newContact() {
    this.setMessage('New contact');
    this.model = {name: ''};
  }

  setMessage(msg: string) {
    this.msg = msg;
    setTimeout(() => this.msg = '', 1500);
  }
}
