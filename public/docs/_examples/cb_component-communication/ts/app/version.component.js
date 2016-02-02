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
    var VersionComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            VersionComponent = (function () {
                function VersionComponent() {
                    this.changeLog = [];
                }
                VersionComponent.prototype.ngOnChanges = function (changes) {
                    var log = '';
                    for (var propName in changes) {
                        var changedProp = changes[propName];
                        var fromValue = JSON.stringify(changedProp.previousValue);
                        var toValue = JSON.stringify(changedProp.currentValue);
                        if (log.length > 0)
                            log += ', ';
                        log += propName + " changed from " + fromValue + " to " + toValue;
                    }
                    this.changeLog.push(log);
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Number)
                ], VersionComponent.prototype, "major");
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Number)
                ], VersionComponent.prototype, "minor");
                VersionComponent = __decorate([
                    core_1.Component({
                        selector: 'version',
                        template: "\n    <h2>Version {{major}}.{{minor}}</h2>\n    <h3>Change log:</h3>\n    <ul>\n      <li *ngFor=\"#change of changeLog\">{{change}}</li>\n    </ul>\n  "
                    }), 
                    __metadata('design:paramtypes', [])
                ], VersionComponent);
                return VersionComponent;
            })();
            exports_1("VersionComponent", VersionComponent);
        }
    }
});
// #enddocregion 
//# sourceMappingURL=version.component.js.map