import type { Express, Request, Response } from "express";

type Todo = {
  id: number;
  title: string;
  completed: boolean;
  description?: string;
};

let todos: Todo[] = [
  { id: 1, title: "Task 1", completed: false },
  { id: 2, title: "Task 2", completed: true },
  { id: 3, title: "Task 3", completed: false },
  { id: 4, title: "Task 4", completed: true },
];

export default function WorkingWithRemoteArrays(app: Express) {
  const getTodos = (req: Request, res: Response) => {
    const { completed } = req.query;
    if (completed !== undefined) {
      const completedBool = completed === "true";
      res.json(todos.filter((t) => t.completed === completedBool));
      return;
    }
    res.json(todos);
  };
  const getTodoById = (req: Request, res: Response) => {
    const { id } = req.params as { id: string };
    const todo = todos.find((t) => t.id === parseInt(id));
    res.json(todo);
  };
  const createNewTodo = (req: Request, res: Response) => {
    const newTodo: Todo = {
      id: new Date().getTime(),
      title: "New Task",
      completed: false,
    };
    todos.push(newTodo);
    res.json(todos);
  };
  const postNewTodo = (req: Request, res: Response) => {
    const newTodo: Todo = { ...req.body, id: new Date().getTime() };
    todos.push(newTodo);
    res.json(newTodo);
  };
  const removeTodo = (req: Request, res: Response) => {
    const { id } = req.params as { id: string };
    const todoIndex = todos.findIndex((t) => t.id === parseInt(id));
    if (todoIndex !== -1) {
      todos.splice(todoIndex, 1);
    }
    res.json(todos);
  };
  const deleteTodo = (req: Request, res: Response) => {
    const { id } = req.params as { id: string };
    const todoIndex = todos.findIndex((t) => t.id === parseInt(id));
    if (todoIndex === -1) {
      res.status(404).json({ message: `Unable to delete Todo with ID ${id}` });
      return;
    }
    todos.splice(todoIndex, 1);
    res.sendStatus(200);
  };
  const updateTodo = (req: Request, res: Response) => {
    const { id } = req.params as { id: string };
    const todoIndex = todos.findIndex((t) => t.id === parseInt(id));
    if (todoIndex === -1) {
      res.status(404).json({ message: `Unable to update Todo with ID ${id}` });
      return;
    }
    todos = todos.map((t) => (t.id === parseInt(id) ? { ...t, ...req.body } : t));
    res.sendStatus(200);
  };
  const updateTodoTitle = (req: Request, res: Response) => {
    const { id, title } = req.params as { id: string; title: string };
    const todo = todos.find((t) => t.id === parseInt(id));
    if (todo) {
      todo.title = title;
    }
    res.json(todos);
  };
  const updateTodoCompleted = (req: Request, res: Response) => {
    const { id, completed } = req.params as { id: string; completed: string };
    const todo = todos.find((t) => t.id === parseInt(id));
    if (todo) {
      todo.completed = completed === "true";
    }
    res.json(todos);
  };
  const updateTodoDescription = (req: Request, res: Response) => {
    const { id, description } = req.params as { id: string; description: string };
    const todo = todos.find((t) => t.id === parseInt(id));
    if (todo) {
      todo.description = description;
    }
    res.json(todos);
  };

  app.get("/lab5/todos/create", createNewTodo);
  app.get("/lab5/todos/:id/delete", removeTodo);
  app.get("/lab5/todos/:id/title/:title", updateTodoTitle);
  app.get("/lab5/todos/:id/completed/:completed", updateTodoCompleted);
  app.get("/lab5/todos/:id/description/:description", updateTodoDescription);
  app.get("/lab5/todos/:id", getTodoById);
  app.get("/lab5/todos", getTodos);
  app.post("/lab5/todos", postNewTodo);
  app.delete("/lab5/todos/:id", deleteTodo);
  app.put("/lab5/todos/:id", updateTodo);
}
