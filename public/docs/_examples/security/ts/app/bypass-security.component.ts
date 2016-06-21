// #docplaster
// #docregion
import {Component, OnInit} from '@angular/core';
import {DomSanitizationService, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';

@Component({
  selector: 'bypass-security',
  templateUrl: 'app/bypass-security.component.html',
})
export class BypassSecurityComponent implements OnInit {
  dangerousUrl: SafeUrl;
  videoId: string = 'PUBnlbjZFAI';  // bound to the videoId input box.

  // #docregion trust-url
  constructor(private sanitizer: DomSanitizationService) {
    // javascript: URLs are dangerous if attacker controlled. Angular sanitizes them in data
    // binding, but we can explicitly tell Angular to trust this value:
    this.dangerousUrl = sanitizer.bypassSecurityTrustUrl('javascript:alert("Hi there")');
  }
  // #enddocregion trust-url

  // #docregion trust-video-url
  trustedVideoUrl(id: string): SafeResourceUrl {
    // Appending an ID to a YouTube URL is safe.
    // Always make sure to construct SafeValue objects as close as possible to the input data, so
    // that it's easier to check if the value is safe.
    return this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + id);
  }
  // #enddocregion trust-video-url
}
// #enddocregion
