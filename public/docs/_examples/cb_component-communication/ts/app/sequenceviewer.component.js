System.register(['angular2/core', './sequenceitem.component'], function(exports_1) {
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
    var core_1, sequenceitem_component_1;
    var SequenceViewer;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (sequenceitem_component_1_1) {
                sequenceitem_component_1 = sequenceitem_component_1_1;
            }],
        execute: function() {
            SequenceViewer = (function () {
                function SequenceViewer() {
                    this.numChanges = 0;
                    this.showAll();
                }
                SequenceViewer.prototype.showAll = function () {
                    this.filter = function (item) { return true; };
                };
                SequenceViewer.prototype.showLast5 = function () {
                    var _this = this;
                    this.filter = function (item) { return item.index >= _this.items.length - 4; };
                };
                SequenceViewer.prototype.getFilteredItems = function () {
                    return this.items.toArray().filter(this.filter);
                };
                SequenceViewer.prototype.ngAfterContentInit = function () {
                    var _this = this;
                    this.numChanges++;
                    this.items.changes.subscribe(function (item) {
                        _this.numChanges++;
                    });
                };
                __decorate([
                    core_1.ContentChildren(sequenceitem_component_1.SequenceItem), 
                    __metadata('design:type', core_1.QueryList)
                ], SequenceViewer.prototype, "items");
                SequenceViewer = __decorate([
                    core_1.Component({
                        selector: 'sequence-viewer',
                        template: "\n    <h2>Sequence items</h2>\n    <div>\n      <button (click)=\"showAll()\">Show All</button>\n      <button (click)=\"showLast5()\">Limit to last 5 items</button>\n    <div>\n    <ul>\n      <sequence-item *ngFor=\"#item of getFilteredItems()\"\n        [index]=\"item.index\"\n        [value]=\"item.value\">\n      </sequence-item>\n    </ul>\n    #of SequenceViewer content children: {{items.length}}<br/>\n    #of SequenceViewer view children: {{getFilteredItems().length}}<br/>\n    #of content item changes: {{numChanges}}\n  ",
                        directives: [sequenceitem_component_1.SequenceItem]
                    }), 
                    __metadata('design:paramtypes', [])
                ], SequenceViewer);
                return SequenceViewer;
            })();
            exports_1("SequenceViewer", SequenceViewer);
        }
    }
});
// #enddocregion 
//# sourceMappingURL=sequenceviewer.component.js.map