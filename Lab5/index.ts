import type { Express, Request, Response } from "express";

export default function Lab5(app: Express) {
  app.get("/lab5/welcome", (req: Request, res: Response) => {
    res.send("Welcome to Lab 5");
  });
}
