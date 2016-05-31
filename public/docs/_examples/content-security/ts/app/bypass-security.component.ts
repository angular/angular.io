// #docplaster
// #docregion
import { Component, OnInit }      from '@angular/core';
import { DomSanitizationService } from '@angular/platform-browser';

import { DistantService } from './distant.service';

@Component({
  selector: 'bypass-security',
  providers: [ DistantService ],
  templateUrl: 'app/bypass-security.component.html'
})
export class BypassSecurityComponent implements OnInit {
  // #docregion user-input
  private base = 'http://thecatapi.com/api/images/get.php?api_key=MTAx&id=';
  userInput: string; // bind to input box.
  // #enddocregion user-input
  unsafeUrl: any;
  urls:      string[] = [];

  constructor(private dss: DomSanitizationService, private distantService: DistantService) {
    this.userInput = '703'; // a default cat
    this.setUrlFromUserInput();
  }
  // #docregion user-input

  // Easy for security team to verify the source of url data
  setUrlFromUserInput() {
    // User entered javascript protocol?
    if (this.userInput.indexOf('javascript:') === -1) {
      // No. Assume entered an image id; add it to the web site base URL.
      this.unsafeUrl = this.base + this.userInput;
    } else {
      // Yes. Anything goes!
      this.unsafeUrl = this.dss.bypassSecurityTrustUrl(this.userInput);
    }
  // #enddocregion user-input
    this.logUnsafeUrl();
  // #docregion user-input
  }
  // #enddocregion user-input

  // #docregion distant-source
  ngOnInit() {
    this.distantService.getUrls().subscribe(url => this.setUrlSomehow(url));
  }

  // Where is the url coming from?
  // Difficult for security team to verify the path back to the source data
  setUrlSomehow(url: string) {
    this.unsafeUrl = this.dss.bypassSecurityTrustUrl(url);
  // #enddocregion distant-source
    this.logUnsafeUrl();
  // #docregion distant-source
  }
  // #enddocregion distant-source

  logUnsafeUrl() {
    let url = this.unsafeUrl;
    console.log(url);
    if (url.changingThisBreaksApplicationSecurity) {
      // Transform into readable format
      url = this.unsafeUrl.changingThisBreaksApplicationSecurity;
    }
    if (this.urls.length > 10) { this.urls.length = 0; }
    this.urls.push(url);
  }
}
// #enddocregion

/*
YouTube variation
  // const base = 'https://www.youtube.com/embed/';
  // userInput = 'PUBnlbjZFAI'; // default to Firebase Security video
*/
