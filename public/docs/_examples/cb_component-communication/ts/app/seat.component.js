System.register(['angular2/core', './vote'], function(exports_1) {
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
    var core_1, vote_1;
    var SeatComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (vote_1_1) {
                vote_1 = vote_1_1;
            }],
        execute: function() {
            SeatComponent = (function () {
                function SeatComponent() {
                    this.onVoted = new core_1.EventEmitter();
                    this.voted = false;
                }
                SeatComponent.prototype.agree = function () {
                    this.onVoted.emit(new vote_1.Vote(this.name, true));
                    this.voted = true;
                };
                SeatComponent.prototype.disagree = function () {
                    this.onVoted.emit(new vote_1.Vote(this.name, false));
                    this.voted = true;
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], SeatComponent.prototype, "name");
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], SeatComponent.prototype, "onVoted");
                SeatComponent = __decorate([
                    core_1.Component({
                        selector: 'seat',
                        template: "\n    <h3>{{name}}</h3>\n    <div>\n      <button (click)=\"agree()\" [disabled]=\"voted\">\n        Agree\n      </button>\n      <button (click)=\"disagree()\" [disabled]=\"voted\">\n        Disagree\n      </button>\n    </div>\n  "
                    }), 
                    __metadata('design:paramtypes', [])
                ], SeatComponent);
                return SeatComponent;
            })();
            exports_1("SeatComponent", SeatComponent);
        }
    }
});
// #enddocregion 
//# sourceMappingURL=seat.component.js.map