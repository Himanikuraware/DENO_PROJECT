import { Router } from "https://deno.land/x/oak/mod.ts";
import { ObjectId } from "https://deno.land/x/mongo@v0.8.0/mod.ts";

import { getDb } from "../helpers/db_client.ts";

const router = new Router();

interface Todo {
  id?: string;
  text: string;
}

let todos: Todo[] = [];

router.get("/", async (ctx) => {
  const todos = await getDb()?.collection("todos").find({}).toArray();
  const transformedTodos = todos?.map(
    (todo: { _id: ObjectId; text: string }) => {
      return {
        id: todo?._id?.$oid,
        text: todo.text,
      };
    }
  );
  ctx.response.body = { todos: transformedTodos };
});

router.post("/todos", async (ctx) => {
  const data = await ctx.request.body();
  const body = await data.value;
  const newTodo: Todo = {
    text: body.text,
  };
  const id = await getDb()?.collection("todos")?.insertOne(newTodo);
  newTodo.id = id?.$oid;
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
