System.register(['angular2/platform/browser', './hello_world'], function(exports_1) {
    var browser_1, hello_world_1;
    return {
        setters:[
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (hello_world_1_1) {
                hello_world_1 = hello_world_1_1;
            }],
        execute: function() {
            browser_1.bootstrap(hello_world_1.HelloWorld);
        }
    }
});
//# sourceMappingURL=main.js.map