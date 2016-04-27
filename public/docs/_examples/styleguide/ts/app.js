System.register(['@angular/angular2'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var angular2_1;
    var AppComponent;
    return {
        setters:[
            function (angular2_1_1) {
                angular2_1 = angular2_1_1;
            }],
        execute: function() {
            // #enddocregion
            // #docregion class-w-annotations
            AppComponent = (function () {
                function AppComponent() {
                }
                AppComponent = __decorate([
                    angular2_1.Component({
                        selector: 'my-app'
                    }),
                    angular2_1.View({
                        template: '<h1 id="output">My First Angular 2 App</h1>'
                    }), 
                    __metadata('design:paramtypes', [])
                ], AppComponent);
                return AppComponent;
            }());
            // #enddocregion
            // #enddocregion
            // #docregion bootstrap
            angular2_1.bootstrap(AppComponent);
        }
    }
});
// #enddocregion
// #enddocregion 
//# sourceMappingURL=app.js.map