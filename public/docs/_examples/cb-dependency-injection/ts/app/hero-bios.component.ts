// #docregion
import {Component}      from 'angular2/core';
import {Bio}            from './bio.component';
import {ContactDetails} from './contact-details.component';

@Component({
  template:`<div>
              <bio [heroIndex]="0">
                <contact-details></contact-details>
              </bio>
            </div>
            <div>
              <bio [heroIndex]="1">
                <contact-details></contact-details>
              </bio>
            </div> 
            <div>
              <bio [heroIndex]="2">
                <contact-details></contact-details>
              </bio>
            </div>`,
  selector:'hero-bios',
  directives:[Bio,ContactDetails]
})

export class Heroes{ 
}