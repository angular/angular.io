System.register(['angular2/core', './hero.component'], function(exports_1) {
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
    var core_1, hero_component_1;
    var MasterComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (hero_component_1_1) {
                hero_component_1 = hero_component_1_1;
            }],
        execute: function() {
            MasterComponent = (function () {
                function MasterComponent() {
                    this.heroes = ['Mr. IQ', 'Magneta', 'Bombasto'];
                    this.master = 'Master';
                }
                MasterComponent = __decorate([
                    core_1.Component({
                        selector: 'master',
                        template: "\n    <h2>{{master}} controls {{heroes.length}} heroes</h2>\n    <hero *ngFor=\"#hero of heroes\"\n      [name]=\"hero\"\n      [master-name]=\"master\">\n    </hero>\n  ",
                        directives: [hero_component_1.HeroComponent]
                    }), 
                    __metadata('design:paramtypes', [])
                ], MasterComponent);
                return MasterComponent;
            })();
            exports_1("MasterComponent", MasterComponent);
        }
    }
});
// #enddocregion
//# sourceMappingURL=master.component.js.map