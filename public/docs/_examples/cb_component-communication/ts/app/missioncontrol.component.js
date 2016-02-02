System.register(['angular2/core', './astronaut.component', './mission.service'], function(exports_1) {
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
    var core_1, astronaut_component_1, mission_service_1;
    var MissionControlComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (astronaut_component_1_1) {
                astronaut_component_1 = astronaut_component_1_1;
            },
            function (mission_service_1_1) {
                mission_service_1 = mission_service_1_1;
            }],
        execute: function() {
            MissionControlComponent = (function () {
                function MissionControlComponent(missionService) {
                    var _this = this;
                    this.missionService = missionService;
                    this.astronauts = ['Lovell', 'Swigert', 'Haise'];
                    this.history = [];
                    missionService.onMissionConfirmed.subscribe(function (astronaut) {
                        _this.history.push(astronaut + " confirmed the mission");
                    });
                }
                MissionControlComponent.prototype.announce = function (mission) {
                    this.missionService.announceMission(mission);
                    this.history.push('Mission announced');
                };
                MissionControlComponent = __decorate([
                    core_1.Component({
                        selector: 'mission-control',
                        template: "\n    <h1>Mission Control</h1>\n    <button (click)=\"announce('Fly to the moon!')\">\n      Announce mission\n    </button>\n    <astronaut *ngFor=\"#astronaut of astronauts\"\n      [name]=\"astronaut\">\n    </astronaut>\n    <h2>History</h2>\n    <ul>\n      <li *ngFor=\"#event of history\">{{event}}</li>\n    </ul>\n  ",
                        directives: [astronaut_component_1.AstronautComponent],
                        providers: [mission_service_1.MissionService]
                    }), 
                    __metadata('design:paramtypes', [mission_service_1.MissionService])
                ], MissionControlComponent);
                return MissionControlComponent;
            })();
            exports_1("MissionControlComponent", MissionControlComponent);
        }
    }
});
// #enddocregion 
//# sourceMappingURL=missioncontrol.component.js.map