import { Injectable } from '@angular/core';

@Injectable()
export class AzureADServiceConstants {
    constructor(
        public clientID:string, 
        public tenantID:string, 
        public redirectURL:string,
        public backendUrl:string, 
        public graphResource = "https://graph.windows.net",
        public isCordova = false,
        public isElectron = false) {}
} 