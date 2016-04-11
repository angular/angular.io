// #docregion
declare module jasmine {
  interface Matchers {
    toEqualData(expected: any):boolean;
  }
}
