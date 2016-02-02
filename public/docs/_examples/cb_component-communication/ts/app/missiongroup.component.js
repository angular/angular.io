System.register(['angular2/core', './messagebus.service'], function(exports_1) {
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
    var core_1, messagebus_service_1;
    var MissionGroup;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (messagebus_service_1_1) {
                messagebus_service_1 = messagebus_service_1_1;
            }],
        execute: function() {
            MissionGroup = (function () {
                function MissionGroup(messageBus) {
                    var _this = this;
                    this.messageBus = messageBus;
                    this.messages = [];
                    console.log(!!messageBus);
                    messageBus.onMessageReceived.subscribe(function (message) {
                        console.log(message);
                        if (!_this.interestedIn || message.indexOf(_this.interestedIn) >= 0) {
                            _this.messages.push(message);
                        }
                    });
                }
                MissionGroup.prototype.doAction = function (action) {
                    this.messageBus.sendMessage(action);
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], MissionGroup.prototype, "name");
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Array)
                ], MissionGroup.prototype, "actions");
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], MissionGroup.prototype, "interestedIn");
                MissionGroup = __decorate([
                    core_1.Component({
                        selector: 'mission-group',
                        template: "\n    <h2>{{name}}</h2>\n    <h3 *ngIf=\"!!actions && actions.length > 0\">Actions</h3>\n    <div *ngFor=\"#action of actions\">\n      <button (click)=\"doAction(action)\">{{action}}</button>\n    </div>\n    <h3>Messages processed</h3>\n    <ul>\n      <li *ngFor=\"#message of messages\">{{message}}</li>\n    </ul>\n  ",
                        providers: [core_1.provide(messagebus_service_1.MessageBus, { useValue: messagebus_service_1.controlMessageBus })]
                    }), 
                    __metadata('design:paramtypes', [messagebus_service_1.MessageBus])
                ], MissionGroup);
                return MissionGroup;
            })();
            exports_1("MissionGroup", MissionGroup);
        }
    }
});
// #enddocregion 
//# sourceMappingURL=missiongroup.component.js.map