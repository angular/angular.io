import { Component } from '@angular/core';
import { Inject, Injectable } from '@angular/core';

@Component({
    template:`
        Simple app demonstrates logging into AzureAD and running a command against the Azure AD graph. <br/> 
        Click the login tab to login, and status tab to view your login status.
        `
    })
export class HomeComponent { }