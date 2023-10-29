let todos = [];

exports.getTodos = (req, res, next) => {
  res.status(200).json({ todos: todos });
};

exports.addTodo = (req, res, next) => {
  const newTodo = { id: new Date().toISOString(), text: req.body.text };
  todos.push(newTodo);
  res.status(201).json({ message: "Item added successfully", todo: newTodo });
};

exports.updateTodo = (req, res, next) => {
  const tId = req.params.todoId;
  const todoIndex = todos.findIndex((todo) => {
    return todo.id === tId;
  });
  todos[todoIndex] = { id: todos[todoIndex].id, text: req.body.text };
  res.status(200).json({ message: "Item updated successfully" });
};

exports.deleteTodo = (req, res, next) => {
  const tId = req.params.todoId;
  todos = todos.filter((todo) => todo.id !== tId);
  res.status(200).json({ message: "Item deleted successfully"});
};
