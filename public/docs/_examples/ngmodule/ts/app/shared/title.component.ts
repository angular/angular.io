// Exact copy of app/title.component.ts except import UserService from shared
import { Component, Input } from '@angular/core';
import { UserService }      from './user.service';

@Component({
  selector: 'app-title',
  templateUrl: 'app/shared/title.component.html',
})
export class TitleComponent {
  @Input() subtitle = '';
  title = 'Angular Modules';
  user = '';

  constructor(userService: UserService) {
    this.user = userService.userName;
  }
}
