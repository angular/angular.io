System.register(['angular2/core', 'angular2/platform/browser', './master.component', './master2.component', './repository.component', './votetaker.component', './missioncontrol.component', './commandcenter.component', './sequence.component'], function(exports_1) {
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
    var core_1, browser_1, master_component_1, master2_component_1, repository_component_1, votetaker_component_1, missioncontrol_component_1, commandcenter_component_1, sequence_component_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (master_component_1_1) {
                master_component_1 = master_component_1_1;
            },
            function (master2_component_1_1) {
                master2_component_1 = master2_component_1_1;
            },
            function (repository_component_1_1) {
                repository_component_1 = repository_component_1_1;
            },
            function (votetaker_component_1_1) {
                votetaker_component_1 = votetaker_component_1_1;
            },
            function (missioncontrol_component_1_1) {
                missioncontrol_component_1 = missioncontrol_component_1_1;
            },
            function (commandcenter_component_1_1) {
                commandcenter_component_1 = commandcenter_component_1_1;
            },
            function (sequence_component_1_1) {
                sequence_component_1 = sequence_component_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                }
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'app',
                        templateUrl: 'app/app.html',
                        directives: [
                            master_component_1.MasterComponent,
                            master2_component_1.Master2Component,
                            repository_component_1.RepositoryComponent,
                            votetaker_component_1.VoteTakerComponent,
                            missioncontrol_component_1.MissionControlComponent,
                            commandcenter_component_1.CommandCenterComponent,
                            sequence_component_1.Sequence
                        ]
                    }), 
                    __metadata('design:paramtypes', [])
                ], AppComponent);
                return AppComponent;
            })();
            browser_1.bootstrap(AppComponent);
        }
    }
});
//# sourceMappingURL=main.js.map