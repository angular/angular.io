System.register(['angular2/core', './mission.service'], function(exports_1) {
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
    var core_1, mission_service_1;
    var AstronautComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (mission_service_1_1) {
                mission_service_1 = mission_service_1_1;
            }],
        execute: function() {
            AstronautComponent = (function () {
                function AstronautComponent(missionService) {
                    var _this = this;
                    this.missionService = missionService;
                    this.mission = "<no mission announced>";
                    this.confirmed = false;
                    this.announced = false;
                    missionService.onMissionAnnounced.subscribe(function (mission) {
                        _this.mission = mission;
                        _this.announced = true;
                        _this.confirmed = false;
                    });
                }
                AstronautComponent.prototype.confirm = function () {
                    this.confirmed = true;
                    this.missionService.onMissionConfirmed.emit(this.name);
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], AstronautComponent.prototype, "name");
                AstronautComponent = __decorate([
                    core_1.Component({
                        selector: 'astronaut',
                        template: "\n    <p>\n      {{name}}: <strong>{{mission}}</strong>\n      <button (click)=\"confirm()\" \n        [disabled]=\"!announced || confirmed\">\n        Confirm\n      </button>\n    </p>\n  "
                    }), 
                    __metadata('design:paramtypes', [mission_service_1.MissionService])
                ], AstronautComponent);
                return AstronautComponent;
            })();
            exports_1("AstronautComponent", AstronautComponent);
        }
    }
});
// #enddocregion 
//# sourceMappingURL=astronaut.component.js.map