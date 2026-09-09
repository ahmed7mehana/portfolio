"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import PortfolioAvatar from "./PortfolioAvatar";

const ProjectItem = ({ title, backgroundImg, tech, projectUrl }) => {
  const router = useRouter();
  const [isOpening, setIsOpening] = useState(false);

  const openDetails = () => {
    if (isOpening) return;
    setIsOpening(true);
    window.setTimeout(() => router.push(projectUrl || "#"), 1000);
  };

  return (
    <div className="group relative flex h-[208px] w-[300px] items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-[#5651e5] to-[#709dff] shadow-xl shadow-gray-400">
      <PortfolioAvatar label={title} src={backgroundImg} className="project-avatar" />
      <div className="project-overlay absolute inset-0 flex w-full flex-col items-center justify-center px-5 text-center">
        <h3 className="text-center text-[18px] uppercase tracking-wider text-white">{title}</h3>
        <p className="pb-4 pt-2 text-center lowercase text-white">{Array.isArray(tech) ? tech.join(" / ") : tech}</p>
        <button type="button" className="details-button inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 text-[13px] font-bold uppercase tracking-wider text-gray-700 disabled:cursor-wait disabled:opacity-80" onClick={openDetails} disabled={isOpening}>
          {isOpening ? <span className="details-spinner" aria-hidden="true" /> : null}
          {isOpening ? "Loading..." : "Details"}
          {!isOpening ? <span aria-hidden="true">-&gt;</span> : null}
        </button>
      </div>
    </div>
  );
};

export default ProjectItem;
