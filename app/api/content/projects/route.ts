import { mockDb } from "../../_data/mock-database";
import { dataResponse } from "../../_lib/http";

export async function GET(request: Request) {
  const category = new URL(request.url).searchParams.get("category");
  const projects = category
    ? mockDb.content.projects.filter(
        (project) => project.category === category,
      )
    : mockDb.content.projects;

  return dataResponse(projects);
}
