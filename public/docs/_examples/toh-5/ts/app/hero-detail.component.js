System.register(['angular2/core', 'angular2/router', './hero.service'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, hero_service_1;
    var HeroDetailComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (hero_service_1_1) {
                hero_service_1 = hero_service_1_1;
            }],
        execute: function() {
            // #enddocregion import-hero-service
            // #docregion extract-template
            HeroDetailComponent = (function () {
                // #docregion ctor
                function HeroDetailComponent(_heroService, _routeParams) {
                    this._heroService = _heroService;
                    this._routeParams = _routeParams;
                }
                // #enddocregion ctor
                // #docregion ng-oninit
                HeroDetailComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    // #docregion get-id
                    var id = +this._routeParams.get('id');
                    // #enddocregion get-id
                    this._heroService.getHero(id)
                        .then(function (hero) { return _this.hero = hero; });
                };
                // #enddocregion ng-oninit
                // #docregion go-back
                HeroDetailComponent.prototype.goBack = function () {
                    window.history.back();
                };
                HeroDetailComponent = __decorate([
                    core_1.Component({
                        selector: 'my-hero-detail',
                        // #docregion template-url
                        templateUrl: 'app/hero-detail.component.html',
                        // #enddocregion template-url
                        // #enddocregion v2
                        styleUrls: ['app/hero-detail.component.css'],
                        inputs: ['hero']
                    }), 
                    __metadata('design:paramtypes', [hero_service_1.HeroService, router_1.RouteParams])
                ], HeroDetailComponent);
                return HeroDetailComponent;
            })();
            exports_1("HeroDetailComponent", HeroDetailComponent);
        }
    }
});
// #enddocregion v2
// #enddocregion
//# sourceMappingURL=hero-detail.component.js.map