// #docregion
// #docplaster
// #docregion base-pipe-spec
import { MyUppercasePipe } from './my-uppercase.pipe';

describe('MyUppercasePipe', () => {
  let pipe: MyUppercasePipe;

  beforeEach(() => {
    pipe = new MyUppercasePipe();
  });

  // #docregion expectations
  it('transforms "abc" to "ABC"', () => {
    expect(pipe.transform('abc')).toEqual('ABC');
  });

  it('transforms "abc def" to "ABC DEF"', () => {
    expect(pipe.transform('abc def')).toEqual('ABC DEF');
  });

  it('leaves "ABC DEF" unchanged', () => {
    expect(pipe.transform('ABC DEF')).toEqual('ABC DEF');
  });
  // #enddocregion expectations
  // #enddocregion base-pipe-spec

  /* more tests we could run

  it('transforms "abc-def" to "Abc-def"', () => {
    expect(pipe.transform('abc-def')).toEqual('Abc-def');
  });

  it('transforms "   abc   def" to "   Abc   Def" (preserves spaces) ', () => {
    expect(pipe.transform('   abc   def')).toEqual('   Abc   Def');
  });

  */
  // #docregion base-pipe-spec
});
// #enddocregion base-pipe-spec
