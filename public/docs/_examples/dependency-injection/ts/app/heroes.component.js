var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
// #docregion
var angular2_1 = require('angular2/angular2');
var mock_heroes_1 = require('./mock-heroes');
var HeroesComponent = (function () {
    function HeroesComponent() {
        this.heroes = mock_heroes_1.HEROES;
    }
    HeroesComponent = __decorate([
        angular2_1.Component({
            selector: 'my-heroes',
            templateUrl: 'app/heroes.component.html'
        }), 
        __metadata('design:paramtypes', [])
    ], HeroesComponent);
    return HeroesComponent;
})();
exports.HeroesComponent = HeroesComponent;
// #enddocregion
//# sourceMappingURL=heroes.component.js.map