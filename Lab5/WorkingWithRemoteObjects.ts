import type { Express, Request, Response } from "express";

const assignment = {
  id: 1,
  title: "NodeJS Assignment",
  description: "Create a NodeJS server with ExpressJS",
  due: "2021-10-10",
  completed: false,
  score: 0,
};

const module = {
  id: "M101",
  name: "Introduction to Node.js",
  description: "Learn Express HTTP routes",
  course: "RS101",
};

export default function WorkingWithRemoteObjects(app: Express) {
  const getAssignment = (req: Request, res: Response) => {
    res.json(assignment);
  };
  const getAssignmentTitle = (req: Request, res: Response) => {
    res.json(assignment.title);
  };
  const setAssignmentTitle = (req: Request, res: Response) => {
    const { newTitle } = req.params as { newTitle: string };
    assignment.title = newTitle;
    res.json(assignment);
  };
  const setAssignmentScore = (req: Request, res: Response) => {
    const { newScore } = req.params as { newScore: string };
    assignment.score = parseInt(newScore);
    res.json(assignment);
  };
  const setAssignmentCompleted = (req: Request, res: Response) => {
    const { completed } = req.params as { completed: string };
    assignment.completed = completed === "true";
    res.json(assignment);
  };

  const getModule = (req: Request, res: Response) => {
    res.json(module);
  };
  const getModuleName = (req: Request, res: Response) => {
    res.json(module.name);
  };
  const setModuleName = (req: Request, res: Response) => {
    const { newName } = req.params as { newName: string };
    module.name = newName;
    res.json(module);
  };
  const setModuleDescription = (req: Request, res: Response) => {
    const { newDescription } = req.params as { newDescription: string };
    module.description = newDescription;
    res.json(module);
  };

  app.get("/lab5/assignment/title/:newTitle", setAssignmentTitle);
  app.get("/lab5/assignment/score/:newScore", setAssignmentScore);
  app.get("/lab5/assignment/completed/:completed", setAssignmentCompleted);
  app.get("/lab5/assignment/title", getAssignmentTitle);
  app.get("/lab5/assignment", getAssignment);

  app.get("/lab5/module/name/:newName", setModuleName);
  app.get("/lab5/module/description/:newDescription", setModuleDescription);
  app.get("/lab5/module/name", getModuleName);
  app.get("/lab5/module", getModule);
}