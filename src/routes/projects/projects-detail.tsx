import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { projects } from "@/lib/site-data";
import { notFound } from "@tanstack/react-router";

function ProjectDetail() {
  const { slug } = Route.useParams();
  const project = projects.find(p => p.slug === slug);

  if (!project) {
    throw notFound();
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <Link to="/projects" className="inline-flex items-center gap-2 text-primary hover:underline">
        <ArrowLeft className="h-4 w-4" />
        Back to Projects
      </Link>
      <h1 className="text-4xl font-bold mt-8">{project.name}</h1>
      <p className="text-muted-foreground mt-4">{project.description}</p>
      <div className="mt-4 p-4 bg-gray-100 rounded">
        <p><strong>Type:</strong> {project.type}</p>
        <p><strong>Area:</strong> {project.area}</p>
        <p><strong>City:</strong> {project.city}</p>
        <p><strong>Team:</strong> {project.teamSize}</p>
      </div>
    </div>
  );
}

export const Route = createFileRoute("/projects/projects-detail")({
  component: ProjectDetail,
});