import { Router } from "https://deno.land/x/oak/mod.ts";

const router = new Router();

interface Todo {
  id: string;
  text: string;
}

let todos: Todo[] = [];

router.get("/", (ctx) => {
  ctx.response.body = { todos: todos };
});

router.post("/todos", async (ctx) => {
  const data = await ctx.request.body();
  const body = await data.value;
  const newTodo: Todo = {
    id: new Date().toISOString(),
    text: body.text,
  };
  todos.push(newTodo);
  ctx.response.body = { message: "Item added successfully!", todo: newTodo };
});

router.put("/todos/:todoId", async (ctx) => {
  const data = await ctx.request.body();
  const body = await data.value;
  const tId = ctx.params.todoId;
  const todoIndex = todos.findIndex((todo) => {
    return todo.id === tId;
  });
  todos[todoIndex] = { id: todos[todoIndex].id, text: body.text };
  ctx.response.body = { message: "Item updated successfully!" };
});

router.delete("/todos/:todoId", (ctx) => {
  const tId = ctx.params.todoId;
  todos = todos.filter((todo) => todo.id !== tId);
  ctx.response.body = { message: "Item deleted successfully!" };
});

export default router;
