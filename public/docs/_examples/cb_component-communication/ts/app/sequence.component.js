System.register(['angular2/core', './sequenceitem.component', './sequenceviewer.component'], function(exports_1) {
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
    var core_1, sequenceitem_component_1, sequenceviewer_component_1;
    var Sequence;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (sequenceitem_component_1_1) {
                sequenceitem_component_1 = sequenceitem_component_1_1;
            },
            function (sequenceviewer_component_1_1) {
                sequenceviewer_component_1 = sequenceviewer_component_1_1;
            }],
        execute: function() {
            Sequence = (function () {
                function Sequence() {
                    this.generatedItems = [];
                }
                Sequence.prototype.nextItem = function () {
                    var allItems = this.viewer.items.toArray();
                    var itemCount = allItems.length;
                    var nextItem = {
                        index: allItems[itemCount - 1].index + 1,
                        value: allItems[itemCount - 1].value + allItems[itemCount - 2].value
                    };
                    this.generatedItems.push(nextItem);
                };
                __decorate([
                    core_1.ViewChild(sequenceviewer_component_1.SequenceViewer), 
                    __metadata('design:type', sequenceviewer_component_1.SequenceViewer)
                ], Sequence.prototype, "viewer");
                Sequence = __decorate([
                    core_1.Component({
                        selector: 'sequence',
                        templateUrl: 'app/sequence-template.html',
                        directives: [sequenceviewer_component_1.SequenceViewer, sequenceitem_component_1.SequenceItem]
                    }), 
                    __metadata('design:paramtypes', [])
                ], Sequence);
                return Sequence;
            })();
            exports_1("Sequence", Sequence);
        }
    }
});
// #enddocregion
//# sourceMappingURL=sequence.component.js.map