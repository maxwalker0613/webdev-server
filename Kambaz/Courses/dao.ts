import { v4 as uuidv4 } from "uuid";

export default function CoursesDao(db: any) {
  function findAllCourses() {
    return db.courses;
  }
  function findCoursesForEnrolledUser(userId: string) {
    const { courses, enrollments } = db;
    return courses.filter((course: any) =>
      enrollments.some(
        (enrollment: any) =>
          enrollment.user === userId && enrollment.course === course._id
      )
    );
  }
  function createCourse(course: any) {
    const newCourse = { ...course, _id: uuidv4() };
    db.courses = [...db.courses, newCourse];
    return newCourse;
  }
  function deleteCourse(courseId: string) {
    const { courses, enrollments } = db;
    db.courses = courses.filter((course: any) => course._id !== courseId);
    db.enrollments = enrollments.filter(
      (enrollment: any) => enrollment.course !== courseId
    );
  }
  function updateCourse(courseId: string, courseUpdates: any) {
    const { courses } = db;
    const course = courses.find((c: any) => c._id === courseId);
    if (course) {
      Object.assign(course, courseUpdates);
    }
    return course;
  }
  return {
    findAllCourses,
    findCoursesForEnrolledUser,
    createCourse,
    deleteCourse,
    updateCourse,
  };
}
