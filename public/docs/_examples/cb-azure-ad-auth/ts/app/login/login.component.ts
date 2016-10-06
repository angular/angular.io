// #docregion
import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';

import {AzureADAuthService} from '../ngAuth/authenticators/AzureADAuthService';

@Component({
    template: `
        <button (click)="logIn()">
            Sign In
        </button>`
})

export class LoginComponent {
    constructor(
        @Inject(AzureADAuthService) private _authService: AzureADAuthService,
        private _router: Router) { }

    logIn() {
        this._authService.logIn("/");
    }
}