var todoList = {
  todos: [],
  addTodo: function(todoText) {
    this.todos.push({
      todoText: todoText,
      completed: false
    });
  },
  changeTodo: function(position, todoText) {
    this.todos[position].todoText = todoText;
  },
  deleteTodo: function(position) {
    this.todos.splice(position, 1);
  },
  toggleCompleted: function(position) {
    var todo = this.todos[position];
    todo.completed = !todo.completed;
  },
  toggleAll: function() {
    var totalTodos = this.todos.length;
    var completedTodos = 0;
    
    this.todos.forEach(function(todo){
      if (todo.completed===true){
        completedTodos++;
      }
    })
    
    // Case 1: If everything’s true, make everything false.
    if (completedTodos === totalTodos) {
    
    this.todos.forEach(function(todo){
      todo.completed = false;
      completedTodos++
    })
    
    // Case 2: Otherwise, make everything true.
    } else {
 
      this.todos.forEach(function(todo){
        todo.completed = true;
        completedTodos++
      })
        
        
        
      }      
    }
};

var handlers = {
  addTodo: function() {
    var addTodoTextInput = window.document.getElementById('addTodoTextInput');
    todoList.addTodo(addTodoTextInput.value);
    addTodoTextInput.value = '';
    view.displayTodos();
  },
  changeTodo: function() {
    var changeTodoPositionInput = window.document.getElementById('changeTodoPositionInput');
    var changeTodoTextInput = window.document.getElementById('changeTodoTextInput');
    todoList.changeTodo(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value);
    changeTodoPositionInput.value = '';
    changeTodoTextInput.value = '';
    view.displayTodos();
  },
  deleteTodo: function(position) {
    todoList.deleteTodo(position);
    view.displayTodos();
  },
  toggleCompleted: function() {
    var toggleCompletedPositionInput = window.document.getElementById('toggleCompletedPositionInput');
    todoList.toggleCompleted(toggleCompletedPositionInput.valueAsNumber);
    toggleCompletedPositionInput.value = '';
    view.displayTodos();
  },
  toggleAll: function() {
    todoList.toggleAll();
    view.displayTodos();
  }  
};

var view = {
  displayTodos: function() {
    var todosUl = window.document.querySelector('ul');
    todosUl.innerHTML = '';
    
    
    
//     for (var i = 0; i < todoList.todos.length; i++) {
//       var todoLi = document.createElement('li');
//       var todo = todoList.todos[i];
//       var todoTextWithCompletion = '';

//       if (todo.completed === true) {
//         todoTextWithCompletion = '(x) ' + todo.todoText;
//       } else {
//         todoTextWithCompletion = '( ) ' + todo.todoText;
//       }
      
//       todoLi.id=i;
//       todoLi.textContent = todoTextWithCompletion;
//       todoLi.appendChild(this.createDeleteButton());
//       todosUl.appendChild(todoLi);
//     }
    todoList.todos.forEach(function(todo, position){
        var todoLi = window.document.createElement('li');
      var todoTextWithCompletion = '';

      if (todo.completed === true) {
        todoTextWithCompletion = '(x) ' + todo.todoText;
      } else {
        todoTextWithCompletion = '( ) ' + todo.todoText;
      }
      
      todoLi.id= position;
      todoLi.textContent = todoTextWithCompletion;
      todoLi.appendChild(view.createDeleteButton());
      todosUl.appendChild(todoLi);
    });
    
    
  },
  
  createDeleteButton:function(){
    var deleteButton = window.document.createElement("button");
    deleteButton.textContent = "Delete!";
    deleteButton.className = "delete-button";
    return deleteButton;
  },
  setUpEventListeners : function(){
  var todosUl = window.document.querySelector("ul");

todosUl.addEventListener("click", function(event){

  
  var elementClicked=event.target;
  
  if (elementClicked.className === "delete-button"){
    handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
  }
  
});
}
  
};

view.setUpEventListeners();
