import { Injectable } from '@angular/core';

@Injectable()
export class JwtHelper {
    private urlBase64Decode(str: string) {
        var output = str.replace(/-/g, '+').replace(/_/g, '/');
        switch (output.length % 4) {
            case 0: { break; }
            case 2: { output += '=='; break; }
            case 3: { output += '='; break; }
            default: {
                throw 'Illegal base64url string!';
            }
        }        
        return decodeURIComponent((<any>window).escape(window.atob(output)));
    }

    public decodeToken(token: string = "") {
        if (token === null || token === "") return {"upn": ""};
        var parts = token.split('.');
        if (parts.length !== 3) {
            throw new Error('JWT must have 3 parts');
        }
        var decoded = this.urlBase64Decode(parts[1]);
        if (!decoded) {
            throw new Error('Cannot decode the token');
        }
        return JSON.parse(decoded);
    }
}