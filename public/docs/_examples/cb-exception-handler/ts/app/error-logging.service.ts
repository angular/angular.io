// #docplaster
// #docregion
import { Injectable } from '@angular/core';

// #docregion class
@Injectable()
export class ErrorLoggingService {
  log(error: any) {
    // Internal tracking.
    this.sendToConsole(error);
    this.sendToServer(error);

    // Software-as-a-Service (SaaS) tracking.
    this.sendToNewRelic(error);
    this.sendToRaygun(error);
    this.sendToRollbar(error);
    this.sendToTrackJs(error);
  }

  private sendToConsole(error: any): void {
    if (console && console.group && console.error) {
      console.group('Error Logging Service');
      console.error(error);
      console.groupEnd();
    }
  }

  private sendToRollbar(error: any): void {
    // Example: Rollbar.error(error);
  }

  private sendToNewRelic(error: any): void {
    // Example: newrelic.noticeError(error);
  }

  private sendToRaygun(error: any): void {
    // Example: Raygun.send(error);
  }

  private sendToServer(error: any): void {
    // ... use http service to send error to your own server.
  }

  private sendToTrackJs(error: any): void {
    // Example: trackJs.track(error);
  }
}
// #enddocregion class
