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
                <ul>
                    <li *ngFor="let file of _files">
                        <span>Name: {{file.remoteItem.name}}</span>
                        <span>Size: {{file.size}}</span>
                    </li>
                </ul>                
        </div>
        <div *ngIf="!this._authService.isUserAuthenticated()">
            User is not signed in.
        </div>
        `
})

export class StatusComponent {
    private _files: any[] = [];
    constructor( @Inject(AzureADAuthService) private _authService: AzureADAuthService, private _authenticatedHttpService: AuthenticatedHttpService) { }

    logOut() {
        this._authService.logOut("/");
    }

    runCommand() {
        this._authenticatedHttpService.get("https://graph.microsoft.com/v1.0/me/drive/recent").subscribe((results => {
            this._files = results.json().value;
        }));
    }
}