import { v4 as uuidv4 } from "uuid";

export default function AssignmentsDao(db: any) {
  function findAssignmentsForCourse(courseId: string) {
    return db.assignments.filter((a: any) => a.course === courseId);
  }
  function findAssignmentById(assignmentId: string) {
    return db.assignments.find((a: any) => a._id === assignmentId);
  }
  function createAssignment(assignment: any) {
    const newAssignment = { ...assignment, _id: uuidv4() };
    db.assignments = [...db.assignments, newAssignment];
    return newAssignment;
  }
  function deleteAssignment(assignmentId: string) {
    db.assignments = db.assignments.filter((a: any) => a._id !== assignmentId);
  }
  function updateAssignment(assignmentId: string, assignmentUpdates: any) {
    const assignment = findAssignmentById(assignmentId);
    if (assignment) {
      Object.assign(assignment, assignmentUpdates);
    }
    return assignment;
  }
  return {
    findAssignmentsForCourse,
    findAssignmentById,
    createAssignment,
    deleteAssignment,
    updateAssignment,
  };
}
