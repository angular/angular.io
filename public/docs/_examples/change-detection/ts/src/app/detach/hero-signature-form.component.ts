import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';

// #docregion
@Component({
  selector: 'hero-signature-form',
  template: `
    <form #signatureForm method="POST" action="/sign" >
      <input type="text" name="username" [(ngModel)]="username" />
      <input type="hidden" name="secret" [value]="secret" />
      <button (click)="sendForm()">Submit</button>
    </form>
  `
})
export class HeroSignatureFormComponent {
  @ViewChild('signatureForm') signatureForm: ElementRef;

  username: string;
  secret: string;

  constructor(private changeDetector: ChangeDetectorRef) { }

  sendForm() {
    this.secret = calculateSecret(this.username);
    // Ensure the secret is flushed into the form field before we submit.
    this.changeDetector.detectChanges();
    this.signatureForm.nativeElement.submit();
  }

}
// #enddocregion

function calculateSecret(username: string) {
  return `SECRET FOR ${username}`;
}
