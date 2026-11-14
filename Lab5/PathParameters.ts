import type { Express, Request, Response } from "express";

export default function PathParameters(app: Express) {
  const add = (req: Request, res: Response) => {
    const { a, b } = req.params as { a: string; b: string };
    res.send((parseInt(a) + parseInt(b)).toString());
  };
  const subtract = (req: Request, res: Response) => {
    const { a, b } = req.params as { a: string; b: string };
    res.send((parseInt(a) - parseInt(b)).toString());
  };
  const multiply = (req: Request, res: Response) => {
    const { a, b } = req.params as { a: string; b: string };
    res.send((parseInt(a) * parseInt(b)).toString());
  };
  const divide = (req: Request, res: Response) => {
    const { a, b } = req.params as { a: string; b: string };
    res.send((parseInt(a) / parseInt(b)).toString());
  };
  app.get("/lab5/add/:a/:b", add);
  app.get("/lab5/subtract/:a/:b", subtract);
  app.get("/lab5/multiply/:a/:b", multiply);
  app.get("/lab5/divide/:a/:b", divide);
}
