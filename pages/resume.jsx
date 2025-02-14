import React from "react";
import Head from "next/head";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";

const resume = () => {
  return (
    <>
      <Head>
        <title>My Resume</title>
        <meta
          name="description"
          content="I’m a front-end web developer specializing in building (and occasionally designing) exceptional digital experiences."
        />
        <link rel="icon" href="/fav.png" />
      </Head>

      <div className="max-w-[940px] mx-auto p-2 pt-[120px]">
        <div className="bg-[#d0d4d6] my-4 p-4 w-full flex justify-between items-center">
          <h2 className="text-center">Ahmed Mehana</h2>
          <div className="flex">
            <a
              href="https://www.linkedin.com/in/ahmed-mehana-b39967240/"
              target="_blank"
              rel="noreferrer"
            >
              <FaLinkedinIn size={20} style={{ marginRight: "1rem" }} />
            </a>
            <a
              href="https://github.com/ahmed7mehana?tab=repositories"
              target="_blank"
              rel="noreferrer"
            >
              <FaGithub size={20} style={{ marginRight: "1rem" }} />
            </a>
          </div>
        </div>
        <div className="py-4 text-xl font-bold tracking-wider text-center uppercase">
          <div className="hidden sm:block">
            <p>
              Web Development <span className="px-1">|</span> Problem Solving
            </p>
          </div>
          <div className="block sm:hidden">
            <p className="py-2">Web Development</p>
            <p> Problem Solving</p>
          </div>
        </div>
        <p>
          A front-end developer specializing in creating responsive and visually
          appealing web applications using modern technologies like React and
          Vue.js. Skilled in writing clean, scalable code with a focus on
          seamless user experiences and high performance. Experienced in
          developing e-commerce platforms, dashboards, and custom business
          solutions. Passionate about blending aesthetics and functionality to
          deliver outstanding results.
        </p>

        {/* Skills */}
        <div className="py-4 text-center">
          <h5 className="text-center underline text-[18px] py-2">Skills</h5>
          <p className="py-2">
            <span className="font-bold">Technical Skills</span>
            <span className="px-2">|</span>Front-End Web Developer
            <span className="px-2">|</span> HTML
            <span className="px-2">|</span>CSS
            <span className="px-2">|</span>Javascript
            <span className="px-2">|</span>React
            <span className="px-2">|</span>Next JS
            <span className="px-2">|</span>Redux
            <span className="px-2">|</span>Tailwind
            <span className="px-2">|</span> Firebase
            <span className="px-2">|</span> RESTAPI
            <span className="px-2">|</span>Bootstrap
            <span className="px-2">|</span>Material ui
            <span className="px-2">|</span>vue
            <span className="px-2">|</span>pinia
            <span className="px-2">|</span>nuxt
            <span className="px-2">|</span>PrimeVue
          </p>
        </div>
        <a
          href="https://drive.google.com/file/d/1TKMvBDTnwNB1TeNjL1nwFSJ_2aOWseQE/view?usp=drivesdk"
          target="_blank"
          rel="noreferrer"
        >
          <h5 className="text-center underline text-[18px] py-4">
            Dounlowd my cv
          </h5>
        </a>
      </div>
    </>
  );
};

export default resume;
