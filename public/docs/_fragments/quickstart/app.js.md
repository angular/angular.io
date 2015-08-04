```
var angular2_1 = require('angular2/angular2');
var MyAppComponent = (function () {
    function MyAppComponent() {
        this.name = 'Alice';
    }
    MyAppComponent = __decorate([
        angular2_1.Component({
            selector: 'my-app'
        }),
        angular2_1.View({
            template: '<h1 id="output">Hello {{ name }}</h1>'
        }), 
        __metadata('design:paramtypes', [])
    ], MyAppComponent);
    return MyAppComponent;
})();
angular2_1.bootstrap(MyAppComponent);
//# sourceMappingURL=app.js.map
```