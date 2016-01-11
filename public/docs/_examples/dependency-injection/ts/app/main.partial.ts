//#docregion
function main() {
  var injector = new Injector([Car, Engine, Tires, Logger]);
  var car = injector.get(Car);
  car.drive();
}
//#enddocregion

//#docregion injector-call
var car = injector.car(Car);
//#enddocregion injector-call

//#docregion injector-call-2
var hc = injector.car(HeroesComponent);
//#enddocregion injector-call-2

//#docregion hs-tag
<my-heroes></my-heroes>
//#enddocregion hs-tag
