System.register(['angular2/core', './hero2.component'], function(exports_1) {
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
    var core_1, hero2_component_1;
    var Master2Component;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (hero2_component_1_1) {
                hero2_component_1 = hero2_component_1_1;
            }],
        execute: function() {
            Master2Component = (function () {
                function Master2Component() {
                    this.heroes = ['Mr. IQ', '   ', 'Bombasto'];
                }
                Master2Component = __decorate([
                    core_1.Component({
                        selector: 'master2',
                        template: "\n    <h2>Master controls {{heroes.length}} heroes</h2>\n    <hero *ngFor=\"#hero of heroes\"\n      [name]=\"hero\">\n    </hero>\n  ",
                        directives: [hero2_component_1.Hero2Component]
                    }), 
                    __metadata('design:paramtypes', [])
                ], Master2Component);
                return Master2Component;
            })();
            exports_1("Master2Component", Master2Component);
        }
    }
});
// #enddocregion
//# sourceMappingURL=master2.component.js.map