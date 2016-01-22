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
    var TodoList;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            TodoList = (function () {
                function TodoList() {
                }
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Array)
                ], TodoList.prototype, "todos", void 0);
                TodoList = __decorate([
                    core_1.Component({
                        selector: 'todo-list',
                        styles: ["\n    .done-true {\n      text-decoration: line-through;\n      color: grey;\n    }"
                        ],
                        template: "\n    <ul class=\"unstyled\">\n      <li *ngFor=\"#todo of todos\">\n        <input type=\"checkbox\" [(ngModel)]=\"todo.done\">\n        <span class=\"done-{{todo.done}}\">{{todo.text}}</span>\n      </li>\n    </ul>"
                    }), 
                    __metadata('design:paramtypes', [])
                ], TodoList);
                return TodoList;
            })();
            exports_1("TodoList", TodoList);
        }
    }
});
//# sourceMappingURL=todo_list.js.map