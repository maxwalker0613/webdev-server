import { v4 as uuidv4 } from "uuid";

export default function EnrollmentsDao(db: any) {
  function isEnrolled(userId: string, courseId: string) {
    return db.enrollments.some(
      (e: any) => e.user === userId && e.course === courseId
    );
  }
  function enrollUserInCourse(userId: string, courseId: string) {
    if (isEnrolled(userId, courseId)) return;
    db.enrollments.push({ _id: uuidv4(), user: userId, course: courseId });
  }
  function unenrollUserFromCourse(userId: string, courseId: string) {
    db.enrollments = db.enrollments.filter(
      (e: any) => !(e.user === userId && e.course === courseId)
    );
  }
  return { enrollUserInCourse, unenrollUserFromCourse };
}
