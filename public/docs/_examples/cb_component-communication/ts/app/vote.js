System.register([], function(exports_1) {
    var Vote;
    return {
        setters:[],
        execute: function() {
            Vote = (function () {
                function Vote(name, agree) {
                    this.name = name;
                    this.agree = agree;
                }
                return Vote;
            })();
            exports_1("Vote", Vote);
        }
    }
});
//# sourceMappingURL=vote.js.map