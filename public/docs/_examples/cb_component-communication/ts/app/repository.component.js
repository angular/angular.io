System.register(['angular2/core', './version.component'], function(exports_1) {
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
    var core_1, version_component_1;
    var RepositoryComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (version_component_1_1) {
                version_component_1 = version_component_1_1;
            }],
        execute: function() {
            RepositoryComponent = (function () {
                function RepositoryComponent() {
                    this.currentMajor = 1;
                    this.currentMinor = 23;
                }
                RepositoryComponent.prototype.newMinor = function () {
                    this.currentMinor++;
                };
                RepositoryComponent.prototype.newMajor = function () {
                    this.currentMajor++;
                    this.currentMinor = 0;
                };
                RepositoryComponent = __decorate([
                    core_1.Component({
                        selector: 'repository',
                        template: "\n    <h1>Hero source code repository</h1>\n    <button (click)=\"newMinor()\">\n      New minor version\n    </button>\n    <button (click)=\"newMajor()\">\n      New major version\n    </button>\n    <version [major]=\"currentMajor\"\n      [minor]=\"currentMinor\">\n    </version>\n  ",
                        directives: [version_component_1.VersionComponent]
                    }), 
                    __metadata('design:paramtypes', [])
                ], RepositoryComponent);
                return RepositoryComponent;
            })();
            exports_1("RepositoryComponent", RepositoryComponent);
        }
    }
});
// #enddocregion
//# sourceMappingURL=repository.component.js.map