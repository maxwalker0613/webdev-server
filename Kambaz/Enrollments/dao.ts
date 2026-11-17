import { v4 as uuidv4 } from "uuid";

export default function EnrollmentsDao(db: any) {
  function enrollUserInCourse(userId: string, courseId: string) {
    const { enrollments } = db;
    enrollments.push({ _id: uuidv4(), user: userId, course: courseId });
  }
  return { enrollUserInCourse };
}
