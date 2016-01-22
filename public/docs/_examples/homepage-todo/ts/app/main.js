System.register(['angular2/platform/browser', './todo_app'], function(exports_1) {
    var browser_1, todo_app_1;
    return {
        setters:[
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (todo_app_1_1) {
                todo_app_1 = todo_app_1_1;
            }],
        execute: function() {
            browser_1.bootstrap(todo_app_1.TodoApp);
        }
    }
});
//# sourceMappingURL=main.js.map