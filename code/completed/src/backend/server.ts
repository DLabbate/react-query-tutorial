import { rest } from "msw";
import todosDb, { TodoItemModel, TodoListModel } from "./db";

// Data Transfer Objects
type UpdateTodoRequestBody = Omit<TodoItemModel, "id">;
type CreateTodoRequestBody = Omit<TodoItemModel, "id" | "completed">;

// Delay to simulate the behaviour of a real API
const delay = 500;

type PathParams = { id: string };

export const handlers = [
  rest.get<never, never, TodoListModel>("/api/todos", async (req, res, ctx) => {
    return res(ctx.status(200), ctx.delay(delay), ctx.json(todosDb.list()));
  }),

  rest.post<CreateTodoRequestBody, never, TodoItemModel>(
    "/api/todos",
    async (req, res, ctx) => {
      const { description }: CreateTodoRequestBody = await req.json();

      const newTodo = todosDb.create(description);

      return res(ctx.status(201), ctx.delay(delay), ctx.json(newTodo));
    }
  ),

  rest.put<UpdateTodoRequestBody, PathParams, TodoItemModel>(
    "/api/todos/:id",
    async (req, res, ctx) => {
      const { id } = req.params;
      const body: UpdateTodoRequestBody = await req.json();

      const updatedTodo = todosDb.update({ id, ...body });

      return res(ctx.status(200), ctx.delay(delay), ctx.json(updatedTodo));
    }
  ),

  rest.delete<never, PathParams>("/api/todos/:id", async (req, res, ctx) => {
    const { id } = req.params;

    todosDb.delete(id);

    return res(ctx.status(204), ctx.delay(delay));
  }),
];
