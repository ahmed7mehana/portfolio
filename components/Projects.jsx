import React from "react";
import ProjectItem from "./ProjectItem";
import { DProjects } from "../Data";

const Projects = () => {
  return (
    <div id="projects" className="w-full ">
      <div className="max-w-[1240px] mx-auto px-2duration-500 py-16">
        <p className="text-xl tracking-widest uppercase  text-[#5651e5]">
          Projects
        </p>
        <h2 className="py-4">What I&apos;ve Built</h2>
        <div className="flex flex-row flex-wrap ">
          {DProjects.map((item) => (
            <div
              key={item.id}
              className="m-2 duration-300 ease-in shadow-xl rounded-xl hover:scale-105"
            >
              <ProjectItem
                title={item.name}
                backgroundImg={item.img}
                projectUrl={item.btn}
                tech={item.tech}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
