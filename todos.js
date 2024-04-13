import { Router } from "express";
import { z } from "zod";

const inputTodoSchema = z.object({
  title: z.string(),
  note: z.string().optional(),
  deadline: z.coerce.date().optional(),
  done: z.boolean().default(false),
  important: z.boolean().default(false),
});

const todosRouter = Router();

const todos = [];

function nextId() {
  return Math.max(0, ...todos.map((t) => t.id)) + 1;
}

todosRouter.get("/", (_, res) => res.json(todos));

todosRouter.get("/done", (_, res) => res.json(todos.filter((t) => t.done)));

todosRouter.get("/incomplete", (_, res) =>
  res.json(todos.filter((t) => !t.done))
);

todosRouter.get("/important", (_, res) =>
  res.json(todos.filter((t) => t.done))
);

todosRouter.get("/planned", (_, res) =>
  res.json(todos.filter((t) => !t.done && t.deadline))
);

todosRouter.get("/overdue", (_, res) =>
  res.json(
    todos.filter((t) => !t.done && t.deadline && t.deadline < new Date())
  )
);

todosRouter.get("/:id", (req, res) => {
  const todo = todos.find((t) => t.id === +req.params.id);

  if (todo) {
    res.json(todo);
  } else {
    res.status(404).end();
  }
});

todosRouter.delete("/:id", (req, res) => {
  const todoIndex = todos.findIndex((t) => t.id === +req.params.id);
  console.log(todoIndex);

  if (todoIndex !== -1) {
    todos.splice(todoIndex, 1);
    res.status(204).end();
  } else {
    res.status(404).end();
  }
});

todosRouter.put("/:id", (req, res) => {
  const id = +req.params.id;
  const todoIndex = todos.findIndex((t) => t.id === id);

  if (todoIndex === -1) {
    res.status(404).end();
    return;
  }

  const updatedTodo = { id, ...inputTodoSchema.parse(req.body) };
  todos[todoIndex] = updatedTodo;
  res.json(updatedTodo);
});

todosRouter.post("/", (req, res) => {
  const newTodo = { id: nextId(), ...inputTodoSchema.parse(req.body) };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

export default todosRouter;
