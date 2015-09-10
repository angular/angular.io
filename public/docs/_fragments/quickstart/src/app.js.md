```
var angular2_1 = require('angular2/angular2');
var AppComponent = (function () {
    function AppComponent() {
        this.name = 'Alice';
    }
    AppComponent = __decorate([
        angular2_1.Component({
            selector: 'app'
        }),
        angular2_1.View({
            template: '<h1 id="output">Hello {{ name }}</h1>'
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
})();
exports.AppComponent = AppComponent;
angular2_1.bootstrap(AppComponent);
//# sourceMappingURL=app.js.map
```