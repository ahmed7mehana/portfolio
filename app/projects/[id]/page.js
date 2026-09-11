"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { DProjects } from "../../../Data";
import ProjectDetail from "../../../components/ProjectDetail";
import { loadPortfolioData } from "../../../lib/firebase";
import { getProjectDetails, normalizeProject } from "../../../lib/content";

export default function DynamicProjectPage() {
  const { id } = useParams();
  const { data, isLoading, isError } = useQuery({ queryKey: ["portfolio-content"], queryFn: loadPortfolioData });
  const projects = (Array.isArray(data?.projects) ? data.projects : DProjects).map(normalizeProject);
  const project = projects.find((item) => String(item.id) === String(id));

  if (isLoading) {
    return <main className="content-page-state"><span className="loading-spinner" /> Loading project...</main>;
  }

  if (isError) {
    return <main className="content-page-state error">Couldn&apos;t load this project. Please try again.</main>;
  }

  if (!project) {
    return <main className="grid min-h-screen place-items-center pt-20 text-slate-500">Project not found.</main>;
  }

  const details = getProjectDetails(project);
  const stack = details.tech;

  return (
    <ProjectDetail
      title={project.name}
      image={project.img}
      stack={stack}
      description={details.explan || "A portfolio project managed from the dashboard."}
      demo={details.Demo || "#"}
      buy={details.buy || "https://wa.me/+201558533755"}
      price={details.price || "5"}
    />
  );
}
