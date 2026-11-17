import type { Express, Request, Response } from "express";
import ModulesDao from "./dao";

export default function ModuleRoutes(app: Express, db: any) {
  const dao = ModulesDao(db);

  const findModulesForCourse = (req: Request, res: Response) => {
    const courseId = req.params.courseId as string;
    res.json(dao.findModulesForCourse(courseId));
  };

  const createModuleForCourse = (req: Request, res: Response) => {
    const courseId = req.params.courseId as string;
    const module = { ...req.body, course: courseId };
    const newModule = dao.createModule(module);
    res.json(newModule);
  };

  const deleteModule = (req: Request, res: Response) => {
    const moduleId = req.params.moduleId as string;
    dao.deleteModule(moduleId);
    res.sendStatus(200);
  };

  const updateModule = (req: Request, res: Response) => {
    const moduleId = req.params.moduleId as string;
    const module = dao.updateModule(moduleId, req.body);
    if (!module) {
      res.status(404).json({ message: `Unable to update Module with ID ${moduleId}` });
      return;
    }
    res.json(module);
  };

  app.get("/api/courses/:courseId/modules", findModulesForCourse);
  app.post("/api/courses/:courseId/modules", createModuleForCourse);
  app.delete("/api/modules/:moduleId", deleteModule);
  app.put("/api/modules/:moduleId", updateModule);
}
