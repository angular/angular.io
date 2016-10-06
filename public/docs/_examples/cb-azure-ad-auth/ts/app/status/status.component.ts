// #docregion
import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticatedHttpService } from '../ngAuth/AuthenticatedHttpService';
import { AzureADAuthService } from '../ngAuth/authenticators/AzureADAuthService';


@Component({
    template: `
        <div *ngIf="this._authService.isUserAuthenticated()">
                userName: {{this._authService.getUserName()}}
                <br/>
                <button (click)="logOut()">Logout</button>
                <br/>
                <button (click)="runCommand()">
                    Run Command
                </button>
                <pre>{{_userData | json}}</pre>
        </div>
        <div *ngIf="!this._authService.isUserAuthenticated()">
            User is not signed in.
        </div>
        `
})

export class StatusComponent {
    private _userData: Object = {"intialValue":"Data will show here once you press RunCommand"};
    constructor( @Inject(AzureADAuthService) private _authService: AzureADAuthService, private _authenticatedHttpService: AuthenticatedHttpService) { }

    logOut() {
        this._authService.logOut("/");
    }

    runCommand() {
        this._authenticatedHttpService.get("https://graph.windows.net/me?api-version=1.6").subscribe((results => {
            this._userData = results.json();
        }));
        // this._authenticatedHttpService.get("https://graph.microsoft.com/v1.0/me/drive/recent").subscribe((results => {
        //     this._files = results.json().value;
        // }));
    }
}