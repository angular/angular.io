System.register(['angular2/core', './herosetter.component'], function(exports_1) {
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
    var core_1, herosetter_component_1;
    var MasterSetterComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (herosetter_component_1_1) {
                herosetter_component_1 = herosetter_component_1_1;
            }],
        execute: function() {
            MasterSetterComponent = (function () {
                function MasterSetterComponent() {
                    this.heroes = ['Mr. IQ', '   ', 'Bombasto'];
                }
                MasterSetterComponent = __decorate([
                    core_1.Component({
                        selector: 'master-setter',
                        template: "\n    <h2>Master controls {{heroes.length}} heroes</h2>\n    <hero *ngFor=\"#hero of heroes\"\n      [name]=\"hero\">\n    </hero>\n  ",
                        directives: [herosetter_component_1.HeroSetterComponent]
                    }), 
                    __metadata('design:paramtypes', [])
                ], MasterSetterComponent);
                return MasterSetterComponent;
            })();
            exports_1("MasterSetterComponent", MasterSetterComponent);
        }
    }
});
// #enddocregion
//# sourceMappingURL=mastersetter.component.js.map