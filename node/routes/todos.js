const express = require("express");

const todosController = require("../controllers/todos");

const router = express.Router();

router.get("/", todosController.getTodos);

router.post("/todos", todosController.addTodo);

router.put("/todos/:todoId", todosController.updateTodo);

router.delete("/todos/:todoId", todosController.deleteTodo);

module.exports = router;
