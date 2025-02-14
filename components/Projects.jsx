import React from "react";
import cryptoImg from "../public/assets/projects/crypto.jpg";
import DreamCart from "../public/assets/Dream-cart.png";
import Candle from "../public/assets/Candle.png";
import Quality from "../public/assets/projects/Quality.png";
import Quran from "../public/assets/projects/Quran.png";
import prime from "../public/assets/projects/prime-lib.png";
import shogly from "../public/assets/projects/shogly.png";
import ProjectItem from "./ProjectItem";

const Projects = () => {
  return (
    <div id="projects" className="w-full ">
      <div className="max-w-[1240px] mx-auto px-2duration-500 py-16">
        <p className="text-xl tracking-widest uppercase  text-[#5651e5]">
          Projects
        </p>
        <h2 className="py-4">What I&apos;ve Built</h2>
        <div className="grid gap-8 md:grid-cols-2 ">
          <ProjectItem
            title="Dream-Cart"
            backgroundImg={DreamCart}
            projectUrl="/property"
            tech="Next.js"
          />

          <ProjectItem
            title="Candle"
            backgroundImg={Candle}
            projectUrl="/Candle"
            tech="Next.js"
          />

          <ProjectItem
            title="crypto"
            backgroundImg={cryptoImg}
            projectUrl="/crypto"
            tech="React"
          />

          <ProjectItem
            title="Quality world"
            backgroundImg={Quality}
            projectUrl="/Quality"
            tech="React"
          />
          {/* https://q-platform.vercel.app/# */}
          <ProjectItem
            title="prime-lib"
            backgroundImg={prime}
            projectUrl="/PrimeLib"
            tech="Nuxt"
          />
          {/* https://prime-lib.vercel.app/ */}
          <ProjectItem
            title="quran-app"
            backgroundImg={Quran}
            projectUrl="/Quran"
            tech="Nuxt"
          />
          {/* https://quran-app-pearl.vercel.app/ */}
          <ProjectItem
            title="shogly"
            backgroundImg={shogly}
            projectUrl="/Shogly"
            tech="React"
          />
          {/* https://shogly-gnsb.vercel.app/ */}
        </div>
      </div>
    </div>
  );
};

export default Projects;
