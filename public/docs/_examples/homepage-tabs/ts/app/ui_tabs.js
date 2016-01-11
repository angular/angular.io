System.register(['angular2/core'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1;
    var UiPane, UiTabs;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            UiPane = (function () {
                function UiPane(viewContainer, templateRef) {
                    this.viewContainer = viewContainer;
                    this.templateRef = templateRef;
                    this._active = false;
                }
                Object.defineProperty(UiPane.prototype, "active", {
                    get: function () {
                        return this._active;
                    },
                    set: function (active) {
                        if (active == this._active)
                            return;
                        this._active = active;
                        if (active) {
                            this.viewContainer.createEmbeddedView(this.templateRef);
                        }
                        else {
                            this.viewContainer.remove(0);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], UiPane.prototype, "title", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Boolean), 
                    __metadata('design:paramtypes', [Boolean])
                ], UiPane.prototype, "active", null);
                UiPane = __decorate([
                    core_1.Directive({
                        selector: '[ui-pane]'
                    }), 
                    __metadata('design:paramtypes', [core_1.ViewContainerRef, core_1.TemplateRef])
                ], UiPane);
                return UiPane;
            })();
            exports_1("UiPane", UiPane);
            UiTabs = (function () {
                function UiTabs() {
                }
                UiTabs.prototype.select = function (pane) {
                    this.panes.toArray().forEach(function (p) { return p.active = p == pane; });
                };
                __decorate([
                    core_1.ContentChildren(UiPane), 
                    __metadata('design:type', core_1.QueryList)
                ], UiTabs.prototype, "panes", void 0);
                UiTabs = __decorate([
                    core_1.Component({
                        selector: 'ui-tabs',
                        template: "\n    <ul class=\"nav nav-tabs\">\n      <li *ngFor=\"var pane of panes\"\n          (click)=\"select(pane)\"\n          role=\"presentation\" [class.active]=\"pane.active\">\n        <a>{{pane.title}}</a>\n      </li>\n    </ul>\n    <ng-content></ng-content>\n    ",
                        styles: ['a { cursor: pointer; cursor: hand; }']
                    }), 
                    __metadata('design:paramtypes', [])
                ], UiTabs);
                return UiTabs;
            })();
            exports_1("UiTabs", UiTabs);
        }
    }
});
//# sourceMappingURL=ui_tabs.js.map