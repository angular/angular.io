//#docregion
//#docregion simplified-annotation
class HeroesComponent {
  static $providers=[HeroService]
}

class HeroService { }

alert(HeroesComponent.$providers)
//#enddocregion simplified-annotation

//#docregion simplified-annotation-transpiled
var HeroesComponent = (function () {
    function HeroesComponent() {
    }
    HeroesComponent.$providers = [HeroService];
    return HeroesComponent;
})();

var HeroService = (function () {
    function HeroService() {
    }
    return HeroService;
})();

alert(HeroesComponent.$providers);
//#enddocregion simplified-annotation-transpiled

//#enddocregion
