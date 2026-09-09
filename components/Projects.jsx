"use client";

import React from "react";
import ProjectItem from "./ProjectItem";
import { DProjects } from "../Data";
import { useQuery } from "@tanstack/react-query";
import { loadPortfolioData } from "../lib/firebase";
import { getProjectImageUrl } from "../lib/content";

const Projects = () => {
  const { data, isLoading, isError } = useQuery({ queryKey: ["portfolio-content"], queryFn: loadPortfolioData });
  const projects = Array.isArray(data?.projects) ? data.projects : DProjects;
  const firstRow = projects.filter((_, index) => index % 2 === 0);
  const secondRow = projects.filter((_, index) => index % 2 === 1);

  const renderRow = (items, reverse = false) => {
    const row = items.length ? items : projects;
    return (
      <div className={`projects-slider ${reverse ? "projects-slider-reverse" : ""}`}>
        <div className="projects-slider-track">
          {[...row, ...row].map((item, index) => (
            <div className="project-motion-card" key={`${item.id}-${index}`}>
              <ProjectItem
                title={item.name}
                backgroundImg={getProjectImageUrl(item.img || item.image)}
                projectUrl={item.btn || `/projects/${item.id}`}
                tech={item.tech || item.Details?.tech}
              />
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <section id="projects" className="projects-section w-full">
      <div className="mx-auto max-w-[1240px] px-2 py-16">
        <p className="text-xl tracking-widest uppercase  text-[#5651e5]">
          Projects
        </p>
        <h2 className="py-4">What I&apos;ve Built</h2>
        {isLoading ? <p className="content-status">Loading projects...</p> : null}
        {isError ? <p className="content-status error">Couldn&apos;t sync projects. Showing saved defaults.</p> : null}
        {renderRow(firstRow)}
        {renderRow(secondRow, true)}
      </div>
    </section>
  );
};

export default Projects;
