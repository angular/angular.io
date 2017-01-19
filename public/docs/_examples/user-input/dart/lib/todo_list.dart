library user_input.todo_list;

import 'dart:html';

import 'package:angular2/angular2.dart';

@Component(selector: 'todo-list')
@View(
    template: '''
<input #todotext (keyup)="doneTyping(\$event)">
<button (click)="addTodo(todotext.value)">Add Todo</button>
<ul>
   <li *ng-for="#todo of todos">
     {{ todo }}
   </li>
</ul>
''',
    directives: const [NgFor])
class TodoList {
  List<String> todos = [
    'Eat breakfast',
    'Walk dog',
    'Breathe',
    'Learn Angular'
  ];

  addTodo(String todo) {
    window.console.log(todos.indexOf(todo));
    if (todos.indexOf(todo) < 0) {
      todos.add(todo);
    }
  }

  doneTyping(KeyboardEvent event) {
    if (event.keyCode == KeyCode.ENTER) {
      InputElement e = event.target;
      addTodo(e.value);
      e.value = null;
    }
  }
}
