import { v4 as uuidv4 } from "uuid";

export default function ModulesDao(db: any) {
  function findModulesForCourse(courseId: string) {
    const { modules } = db;
    return modules.filter((module: any) => module.course === courseId);
  }
  function createModule(module: any) {
    const newModule = { ...module, _id: uuidv4() };
    db.modules = [...db.modules, newModule];
    return newModule;
  }
  function deleteModule(moduleId: string) {
    const { modules } = db;
    db.modules = modules.filter((module: any) => module._id !== moduleId);
  }
  function updateModule(moduleId: string, moduleUpdates: any) {
    const { modules } = db;
    const module = modules.find((m: any) => m._id === moduleId);
    if (module) {
      Object.assign(module, moduleUpdates);
    }
    return module;
  }
  return { findModulesForCourse, createModule, deleteModule, updateModule };
}
