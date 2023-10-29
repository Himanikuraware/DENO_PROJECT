import { Router } from "https://deno.land/x/oak/mod.ts";
import { ObjectId } from "https://deno.land/x/mongo@v0.32.0/mod.ts";

import { getDb } from "../helpers/db_client.ts";

const router = new Router();

interface Todo {
  id?: string;
  text: string;
}

router.get("/", async (ctx) => {
  const todos = await getDb()?.collection("todos").find({}).toArray();
  const transformedTodos = todos?.map(
    (todo: { _id: ObjectId; text: string }) => {
      return {
        id: todo?._id?.toString(),
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
  newTodo.id = id?.toString();
  ctx.response.body = { message: "Item added successfully!", todo: newTodo };
});

router.put("/todos/:todoId", async (ctx) => {
  const data = await ctx.request.body();
  const body = await data?.value;
  const tId = ctx?.params?.todoId!; //! We use this in typescript to ensure that tId will never be undefined.
  await getDb()
    ?.collection("todos")
    ?.updateOne({ _id: new ObjectId(tId) }, { $set: { text: body.text } });
  ctx.response.body = { message: "Item updated successfully!" };
});

router.delete("/todos/:todoId", async (ctx) => {
  const tId = ctx.params.todoId!;
  await getDb()
    .collection("todos")
    .deleteOne({ _id: new ObjectId(tId) });

  ctx.response.body = { message: "Item deleted successfully!" };
});

export default router;
