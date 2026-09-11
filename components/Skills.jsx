"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { DSkills } from "../Data";
import { loadPortfolioData } from "../lib/firebase";
import PortfolioAvatar from "./PortfolioAvatar";

const Skills = () => {
  const { data, isLoading, isError } = useQuery({ queryKey: ["portfolio-content"], queryFn: loadPortfolioData });
  const skills = Array.isArray(data?.skills) ? data.skills : DSkills;
  const sliderItems = [...skills, ...skills];

  return (
    <section id="skills" className="skills-section w-full overflow-hidden p-2 lg:min-h-screen">
      <div className="mx-auto flex h-full max-w-[1240px] flex-col justify-center">
        <p className="text-xl tracking-widest uppercase text-[#5651e5]">
          Skills
        </p>
        <h2 className="py-4">What I Can Do</h2>
        {isLoading ? <p className="content-status">Loading skills...</p> : null}
        {isError ? <p className="content-status error">Couldn&apos;t sync skills. Showing saved defaults.</p> : null}
        <div className="skills-slider" aria-label="Skills slider">
          <div className="skills-slider-track">
            {sliderItems.map((item, index) => (
              <div key={`${item.id}-${index}`} className="skill-slide">
                {item.img ? <img className="skill-image" src={item.img} alt="" /> : <PortfolioAvatar label={item.title} className="skill-avatar" />}
                <h3>{item.title}</h3>
              </div>
            ))}
          </div>
        </div>
        <div className="skills-slider skills-slider-reverse" aria-hidden="true">
          <div className="skills-slider-track">
            {[...sliderItems].reverse().map((item, index) => (
              <div key={`reverse-${item.id}-${index}`} className="skill-slide">
                {item.img ? <img className="skill-image" src={item.img} alt="" /> : <PortfolioAvatar label={item.title} className="skill-avatar" />}
                <h3>{item.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
export default Skills;
