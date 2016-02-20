// #docregion
import {Component, provide} from 'angular2/core';
import {CryptoService} from './crypto.service';
import {Crypto2Service} from './crypto2.service';

@Component({
  selector: 'my-enigma',
  template: `
    <h2>Enigma</h2>
    <label>Original message:</label>
    <input #original (keyup)="0">
    <p>Encoded message:
      <code>{{encode(original.value)}}</code>
    </p>
  `,
  // Originally we used this: providers: [CryptoService]
  providers: [provide(CryptoService, {useClass: Crypto2Service})]
})
export class EnigmaComponent {
  constructor(private _crypto: CryptoService) {}
  
  encode(original: string) {
    return this._crypto.encode(original);
  }
}
// #enddocregion
