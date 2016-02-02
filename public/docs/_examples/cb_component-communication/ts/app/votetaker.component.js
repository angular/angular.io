System.register(['angular2/core', './seat.component'], function(exports_1) {
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
    var core_1, seat_component_1;
    var VoteTakerComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (seat_component_1_1) {
                seat_component_1 = seat_component_1_1;
            }],
        execute: function() {
            VoteTakerComponent = (function () {
                function VoteTakerComponent() {
                    this.agreed = 0;
                    this.disagreed = 0;
                    this.seats = ['Mr. IQ', 'Ms. Universe', 'Bombasto'];
                }
                VoteTakerComponent.prototype.seatVotes = function (vote) {
                    if (vote.agree)
                        this.agreed++;
                    else
                        this.disagreed++;
                };
                VoteTakerComponent = __decorate([
                    core_1.Component({
                        selector: 'vote-taker',
                        template: "\n    <h1>Should mankind colonize the Universe?</h1>\n    <h2>Agree: {{agreed}}, Disagree: {{disagreed}}</h2>\n    <seat *ngFor=\"#seat of seats\"\n      [name]=\"seat\"\n      (onVoted)=\"seatVotes($event)\">\n    </seat>\n  ",
                        directives: [seat_component_1.SeatComponent]
                    }), 
                    __metadata('design:paramtypes', [])
                ], VoteTakerComponent);
                return VoteTakerComponent;
            })();
            exports_1("VoteTakerComponent", VoteTakerComponent);
        }
    }
});
// #enddocregion 
//# sourceMappingURL=votetaker.component.js.map