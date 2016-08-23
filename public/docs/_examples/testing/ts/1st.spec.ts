// #docplaster
// #docregion it
 it('true is true', () => expect(true).toEqual(true));
 // #enddocregion it

// #docregion describe
 describe('1st tests', () => {

  it('true is true', () => expect(true).toEqual(true));

  // #enddocregion describe
  // #docregion another-test
  it('null is not the same thing as undefined',
    () => expect(null).not.toEqual(undefined)
  );
  // #enddocregion another-test

  // #docregion describe
});
// #enddocregion describe
