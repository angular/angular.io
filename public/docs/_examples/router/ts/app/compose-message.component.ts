// #docregion
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/do';
import { Component, HostBinding,
         trigger, transition,
         animate, style, state }  from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';

@Component({
  template: `
    <h3>Contact Crisis Center</h3>
    <div *ngIf="details">
      {{ details }}
    </div>
    <div>
      <div>
        <label>Message: </label>
      </div>
      <div>
        <textarea [(ngModel)]="message" rows="10" cols="35" [disabled]="sending"></textarea>
      </div>
    </div>
    <p *ngIf="!sending">
      <button (click)="send()">Send</button>
      <button (click)="cancel()">Cancel</button>
    </p>
  `,
  styles: [
    `
      :host {
        position: relative;
        bottom: 10%;
      }
    `
  ],
  animations: [
    trigger('routeAnimation', [
      state('*',
        style({
          opacity: 1,
          transform: 'translateX(0)'
        })
      ),
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'translateY(100%)'
        }),
        animate('0.2s ease-in')
      ]),
      transition(':leave', [
        animate('0.5s ease-out', style({
          opacity: 0,
          transform: 'translateY(100%)'
        }))
      ])
    ])
  ]
})
export class ComposeMessageComponent {
  @HostBinding('@routeAnimation') get routeAnimation() {
    return true;
  }

  @HostBinding('style.display') get display() {
    return 'block';
  }

  @HostBinding('style.position') get position() {
    return 'absolute';
  }

  details: string;
  sending: boolean = false;

  constructor(private router: Router) {}

  send() {
    this.sending = true;
    this.details = 'Sending Message...';

    Observable.of(true)
      .delay(1000)
      .do(() => {
        this.sending = false;

        // Close the modal
        this.closeModal();
      }).subscribe();
  }

  closeModal() {
    // Providing a `null` value to the named outlet
    // clears the contents of the named outlet
    this.router.navigate([{ outlets: { modal: null }}]);
  }

  cancel() {
    // Close the modal
    this.closeModal();
  }
}
