System.register(['angular2/core', './hero-detail.component', './hero.service.1'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, hero_detail_component_1, hero_service_1_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (hero_detail_component_1_1) {
                hero_detail_component_1 = hero_detail_component_1_1;
            },
            function (hero_service_1_1_1) {
                hero_service_1_1 = hero_service_1_1_1;
            }],
        execute: function() {
            // #enddocregion hero-service-import
            // Testable but never shown
            AppComponent = (function () {
                // #enddocregion new-service
                // #docregion ctor
                function AppComponent(_heroService) {
                    this._heroService = _heroService;
                    // #enddocregion on-init
                    this.title = 'Tour of Heroes';
                    // #docregion new-service
                    this.heroService = new hero_service_1_1.HeroService(); // don't do this
                }
                // #enddocregion ctor
                // #docregion getHeroes
                AppComponent.prototype.getHeroes = function () {
                    //#docregion get-heroes
                    this.heroes = this._heroService.getHeroes();
                    // #enddocregion get-heroes
                };
                // #enddocregion getHeroes
                // #docregion ng-on-init
                // #docregion on-init
                AppComponent.prototype.ngOnInit = function () {
                    // #enddocregion on-init
                    this.getHeroes();
                    // #docregion on-init
                };
                // #enddocregion on-init
                // #enddocregion ng-on-init
                AppComponent.prototype.onSelect = function (hero) { this.selectedHero = hero; };
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        template: "\n  <div *ngFor=\"#hero of heroes\" (click)=\"onSelect(hero)\">\n    {{hero.name}}\n  </div>\n  <my-hero-detail [hero]=\"selectedHero\"></my-hero-detail>\n  ",
                        directives: [hero_detail_component_1.HeroDetailComponent],
                        // #docregion providers
                        providers: [hero_service_1_1.HeroService]
                    }), 
                    __metadata('design:paramtypes', [hero_service_1_1.HeroService])
                ], AppComponent);
                return AppComponent;
            })();
            exports_1("AppComponent", AppComponent);
        }
    }
});
// #enddocregion on-init
//# sourceMappingURL=app.component.1.js.map