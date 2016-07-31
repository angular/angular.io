// #docregion
import { ExceptionHandler } from '@angular/core';
import { Injectable } from '@angular/core';

import { ErrorLoggingService } from './error-logging.service';

// #docregion class
@Injectable()
export class CustomExceptionHandler {
  private errorLogggingService: ErrorLoggingService;

  constructor(errorLogggingService: ErrorLoggingService) {
    this.errorLogggingService = errorLogggingService;
  }

  // Public methods.

  public call(exception: any, stackTrace?: any, reason?: string) {
    this.logToConsole(exception, stackTrace, reason);

    try {
      // Internally, Angular wraps Error objects inside a proxy; therefore, when we
      // send the error to the logging service, we want to try and unwrap the error 
      // first so that we're more likely to send-over a native Error object.
      // --
      // CAUTION: This is NOT A DOCUMENTED BEHAVIOR - you have to look at the Angular
      // source code in order to see that this happens.
      this.errorLogggingService.log(this.unwrapError(exception));
    } catch (loggingError) {
      this.logToConsole(loggingError);
    }
  }

  // Private methods.

  private logToConsole(exception: any, stackTrace?: any, reason?: string) {
    // Even though we are replacing the core _instance_ of the ExceptionHandler, we can
    // still leverage the core class' static method for stringification of the error.
    let stringified = ExceptionHandler.exceptionToString(exception, stackTrace, reason);

    if (console && console.group && console.log) {
      console.group('Custom Exception Handler');
      console.log(stringified);
      console.groupEnd();
    }
  }

  private unwrapError(exception: any): any {
    while (exception.originalException) {
      exception = exception.originalException;
    }
    return(exception);
  }
}
// #enddocregion class
