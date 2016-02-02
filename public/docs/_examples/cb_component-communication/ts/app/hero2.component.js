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
    var Hero2Component;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            Hero2Component = (function () {
                function Hero2Component() {
                    this._name = '<no name set>';
                }
                Object.defineProperty(Hero2Component.prototype, "name", {
                    get: function () {
                        return this._name;
                    },
                    set: function (newName) {
                        if (newName && newName.trim() != '') {
                            this._name = newName;
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Hero2Component.prototype, "name",
                    __decorate([
                        core_1.Input(), 
                        __metadata('design:type', String), 
                        __metadata('design:paramtypes', [String])
                    ], Hero2Component.prototype, "name", Object.getOwnPropertyDescriptor(Hero2Component.prototype, "name")));
                Hero2Component = __decorate([
                    core_1.Component({
                        selector: 'hero',
                        template: "\n    <h3>{{name}}</h3>\n  "
                    }), 
                    __metadata('design:paramtypes', [])
                ], Hero2Component);
                return Hero2Component;
            })();
            exports_1("Hero2Component", Hero2Component);
        }
    }
});
// #enddocregion
//# sourceMappingURL=hero2.component.js.map