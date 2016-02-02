System.register(['angular2/core'], function(exports_1) {
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
    var core_1;
    var HeroComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            HeroComponent = (function () {
                function HeroComponent() {
                }
                HeroComponent.prototype.greetMaster = function () {
                    return "I, " + this.name + ", am at your service, " + this.master + ".";
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], HeroComponent.prototype, "name");
                __decorate([
                    core_1.Input('master-name'), 
                    __metadata('design:type', String)
                ], HeroComponent.prototype, "master");
                HeroComponent = __decorate([
                    core_1.Component({
                        selector: 'hero',
                        template: "\n    <h3>{{name}} says:</h3>\n    <p>{{greetMaster()}}</p>\n  "
                    }), 
                    __metadata('design:paramtypes', [])
                ], HeroComponent);
                return HeroComponent;
            })();
            exports_1("HeroComponent", HeroComponent);
        }
    }
});
// #enddocregion
//# sourceMappingURL=hero.component.js.map