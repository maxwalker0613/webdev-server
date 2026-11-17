import type { Express, Request, Response } from "express";
import EnrollmentsDao from "./dao";

export default function EnrollmentRoutes(app: Express, db: any) {
  const dao = EnrollmentsDao(db);

  const resolveUserId = (req: Request, res: Response) => {
    let userId = req.params.userId as string;
    if (userId === "current") {
      const currentUser = req.session["currentUser"];
      if (!currentUser) {
        res.sendStatus(401);
        return null;
      }
      userId = currentUser._id;
    }
    return userId;
  };

  const enrollUserInCourse = (req: Request, res: Response) => {
    const userId = resolveUserId(req, res);
    if (!userId) return;
    dao.enrollUserInCourse(userId, req.params.courseId as string);
    res.sendStatus(200);
  };

  const unenrollUserFromCourse = (req: Request, res: Response) => {
    const userId = resolveUserId(req, res);
    if (!userId) return;
    dao.unenrollUserFromCourse(userId, req.params.courseId as string);
    res.sendStatus(200);
  };

  app.post("/api/users/:userId/courses/:courseId", enrollUserInCourse);
  app.delete("/api/users/:userId/courses/:courseId", unenrollUserFromCourse);
}
