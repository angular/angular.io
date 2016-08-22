// #docregion
import { Component } from '@angular/core';

import { Todo }      from './todo';
import { TodoListComponent }  from './todo_list';
import { TodoFormComponent }  from './todo_form';

@Component({
  selector: 'todo-app',
  template: `
    <h2>Todo</h2>
    <span>{{remaining}} of {{todos.length}} remaining</span>
    [ <a (click)="archive()">archive</a> ]

    <todo-list [todos]="todos"></todo-list>
    <todo-form (newTask)="addTask($event)"></todo-form>`,
  styles: ['a { cursor: pointer; cursor: hand; }'],
  directives: [TodoListComponent, TodoFormComponent]
})
export class TodoAppComponent {
  todos: Todo[] = [
      {text: 'learn angular',        done: true},
      {text: 'build an angular app', done: false}
  ];

  get remaining() {
    return this.todos.filter(todo => !todo.done).length;
  }

  archive(): void {
    let oldTodos = this.todos;
    this.todos = [];
    oldTodos.forEach(todo => {
      if (!todo.done) { this.todos.push(todo); }
    });
  }

  addTask(task: Todo) {
    this.todos.push(task);
  }
}
