// #docplaster
// #docregion
import { Injectable } from '@angular/core';

// #docregion class
@Injectable()
export class ErrorLoggingService {
  constructor() {}

  // Public methods.

  public log(error: any) {
    // Internal tracking.
    this.sendToConsole(error);
    this.sendToServer(error);

    // Software-as-a-Service (SaaS) tracking.
    this.sendToNewRelic(error);
    this.sendToRaygun(error);
    this.sendToRollbar(error);
    this.sendToTrackJs(error);
  }

  // Private methods.

  private sendToConsole(error: any) {
    if (console && console.group && console.error) {
      console.group('Error Logging Service');
      console.error(error);
      console.groupEnd();
    }
  }

  private sendToRollbar(error: any) {
    // Example: Rollbar.error(error);
  }

  private sendToNewRelic(error: any) {
    // Example: newrelic.noticeError(error);
  }

  private sendToRaygun(error: any) {
    // Example: Raygun.send(error);
  }

  private sendToServer(error: any) {
    // ... use http service to send error to your own server.
  }

  private sendToTrackJs(error: any) {
    // Example: trackJs.track(error);
  }
}
// #enddocregion class
