import {Component} from 'angular2/core';
import {Pipe, PipeTransform} from 'angular2/core';

// #docregion pipe
// Pure pipe
@Pipe({ name: 'randomizer' })
export class RandomizerPipe implements PipeTransform {
  // Impure function
  transform() { return Math.random() * 10 ;}
}
// #enddocregion pipe

@Component({
  selector: 'random-pipe',
  template: `
  <h2>Random Pipe (pure pipe/impure function)</h2>
  <input #box (input)="0">
  <p>Input value: {{box.value}}</p>
  <p>Random pipe output: {{box.value | randomizer}}</p>
  `,
  pipes: [RandomizerPipe]
})
export class RandomPipeComponent {
}
