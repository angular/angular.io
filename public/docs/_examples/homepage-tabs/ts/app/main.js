System.register(['angular2/platform/browser', './di_demo'], function(exports_1) {
    var browser_1, di_demo_1;
    return {
        setters:[
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (di_demo_1_1) {
                di_demo_1 = di_demo_1_1;
            }],
        execute: function() {
            browser_1.bootstrap(di_demo_1.DiDemo);
        }
    }
});
//# sourceMappingURL=main.js.map