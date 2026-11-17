import type { Express, Request, Response } from "express";
import AssignmentsDao from "./dao";

export default function AssignmentRoutes(app: Express, db: any) {
  const dao = AssignmentsDao(db);

  const findAssignmentsForCourse = (req: Request, res: Response) => {
    const courseId = req.params.courseId as string;
    res.json(dao.findAssignmentsForCourse(courseId));
  };

  const findAssignmentById = (req: Request, res: Response) => {
    const assignmentId = req.params.assignmentId as string;
    const assignment = dao.findAssignmentById(assignmentId);
    if (!assignment) {
      res.status(404).json({ message: `Unable to find Assignment with ID ${assignmentId}` });
      return;
    }
    res.json(assignment);
  };

  const createAssignmentForCourse = (req: Request, res: Response) => {
    const courseId = req.params.courseId as string;
    const assignment = { ...req.body, course: courseId };
    res.json(dao.createAssignment(assignment));
  };

  const deleteAssignment = (req: Request, res: Response) => {
    const assignmentId = req.params.assignmentId as string;
    dao.deleteAssignment(assignmentId);
    res.sendStatus(200);
  };

  const updateAssignment = (req: Request, res: Response) => {
    const assignmentId = req.params.assignmentId as string;
    const assignment = dao.updateAssignment(assignmentId, req.body);
    if (!assignment) {
      res.status(404).json({ message: `Unable to update Assignment with ID ${assignmentId}` });
      return;
    }
    res.json(assignment);
  };

  app.get("/api/courses/:courseId/assignments", findAssignmentsForCourse);
  app.post("/api/courses/:courseId/assignments", createAssignmentForCourse);
  app.get("/api/assignments/:assignmentId", findAssignmentById);
  app.put("/api/assignments/:assignmentId", updateAssignment);
  app.delete("/api/assignments/:assignmentId", deleteAssignment);
}
