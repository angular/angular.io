// #docregion
import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: './app.component.html'
})
export class AppComponent {
  // #docregion i18n-plural-pipe
  messages: string[] = [];
  messageMapping: {[k: string]: string} = {
    '=0': 'No messages.',
    'one': 'One message.',
    'other': '# messages.'
  };
  // #enddocregion i18n-plural-pipe
  // #docregion i18n-select-pipe
  gender = 'male';
  genderMap = {
    'male': 'Invite him.',
    'female': 'Invite her.',
    'other': 'Invite them.'
  };
  // #enddocregion i18n-select-pipe
}

