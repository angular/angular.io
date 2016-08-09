// Exact copy except import UserService from shared
// #docregion
import { Component, OnInit }      from '@angular/core';

import { Contact, ContactService } from './contact.service';
import { UserService }    from '../shared/user.service';

@Component({
  selector: 'app-contact',
  templateUrl: 'app/contact/contact.component.html',
  styleUrls: ['app/contact/contact.component.css']
})
export class ContactComponent implements OnInit {
  contact:  Contact;
  contacts: Contact[];

  msg = 'Loading contacts ...';
  userName = '';

  constructor(private contactService: ContactService, userService: UserService) {
    this.userName = userService.userName;
  }

  ngOnInit() {
    this.contactService.getContacts().then(contacts => {
      this.msg = '';
      this.contacts = contacts;
      this.contact = contacts[0];
    });
  }

  next() {
    let ix = 1 + this.contacts.indexOf(this.contact);
    if (ix >= this.contacts.length) { ix = 0; }
    this.contact = this.contacts[ix];
  }

  onSubmit() {
    // TODO: do something like save it
    this.displayMessage('Saved ' + this.contact.name);
  }

  newContact() {
    this.displayMessage('New contact');
    this.contact = {id: 42, name: ''};
    this.contacts.push(this.contact);
  }

  /** Display a message briefly, then remove it. */
  displayMessage(msg: string) {
    this.msg = msg;
    setTimeout(() => this.msg = '', 1500);
  }
}
