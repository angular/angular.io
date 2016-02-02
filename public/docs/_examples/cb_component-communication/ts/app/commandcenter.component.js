System.register(['angular2/core', './missiongroup.component'], function(exports_1) {
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
    var core_1, missiongroup_component_1;
    var CommandCenterComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (missiongroup_component_1_1) {
                missiongroup_component_1 = missiongroup_component_1_1;
            }],
        execute: function() {
            CommandCenterComponent = (function () {
                function CommandCenterComponent() {
                }
                CommandCenterComponent = __decorate([
                    core_1.Component({
                        selector: 'command-center',
                        templateUrl: 'app/commandcenter-template.html',
                        directives: [missiongroup_component_1.MissionGroup]
                    }), 
                    __metadata('design:paramtypes', [])
                ], CommandCenterComponent);
                return CommandCenterComponent;
            })();
            exports_1("CommandCenterComponent", CommandCenterComponent);
        }
    }
});
// #enddocregion 
//# sourceMappingURL=commandcenter.component.js.map