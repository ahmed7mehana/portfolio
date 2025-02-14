import Image from "next/image";
import React from "react";
import { DSkills } from "../Data";
const Skills = () => {
  return (
    <div id="skills" className="w-full p-2 lg:h-screen">
      <div className="max-w-[1240px] mx-auto flex flex-col justify-center h-full">
        <p className="text-xl tracking-widest uppercase text-[#5651e5]">
          Skills
        </p>
        <h2 className="py-4">What I Can Do</h2>
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {DSkills.map((item) => (
            <div
              key={item.id}
              className="p-6 duration-300 ease-in shadow-xl rounded-xl hover:scale-105"
            >
              <div className="grid items-center justify-center grid-cols-2 gap-4">
                {item.img ? (
                  <div className="m-auto">
                    <img
                      src={item.img}
                      width={64}
                      height={64}
                      alt={item.title}
                    />
                  </div>
                ) : null}
                <div className="flex flex-col items-center justify-center">
                  <h3>{item.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Skills;
