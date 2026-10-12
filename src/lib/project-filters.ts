import type { Project } from "@/data/projects";

const categoryOrder = ["Interior Design", "Architecture", "3D Visualization", "Technical Drawings"];
export function matchesProjectCategory(project: Project, category: string): boolean {
  return category === "All" || project.category === category ||
    (category === "3D Visualization" && project.services.some(service => service.toLowerCase() === "3d visualization")) ||
    (category === "Technical Drawings" && !!project.technicalDrawings?.length);
}
export function projectCategories(collection: Project[]): string[] {
  return ["All", ...categoryOrder.filter(category => collection.some(project => matchesProjectCategory(project, category)))];
}
