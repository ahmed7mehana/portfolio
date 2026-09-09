"use client";

import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import AboutImg from "../public/assets/about.jpg";
import { loadPortfolioData } from "../lib/firebase";

const defaultSiteContent = {
  aboutLabel: "About",
  aboutTitle: "Who I Am",
  aboutText: "I'm Ahmed, a front-end developer who turns complex ideas into clear, fast, and memorable digital experiences. I work across React, Next.js, and Firebase to build products that feel polished on the first visit and stay easy to maintain after launch. Every project starts with a real conversation about the goal, the audience, and the detail that makes the work worth remembering.",
  aboutButton: "Explore my projects.",
};

const About = () => {
  const { data } = useQuery({ queryKey: ["portfolio-content"], queryFn: loadPortfolioData });
  const content = { ...defaultSiteContent, ...(data?.siteContent || {}) };

  return (
    <section id="about" className="about-section flex w-full items-center p-2 py-16 md:min-h-screen">
      <div className="max-w-[1240px] m-auto md:grid grid-cols-3 gap-8">
        <motion.div className="col-span-2" initial={{ opacity: 0, x: -35 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.7 }}>
          <p className="uppercase text-xl tracking-widest text-[#5651e5]">{content.aboutLabel}</p>
          <h2 className="py-4">{content.aboutTitle}</h2>
          <p className="about-copy py-2 text-gray-600">
            {content.aboutText}
          </p>

          <Link href="/#projects" className="block">
            <p className="about-link py-2 text-center text-gray-600 duration-500 border-2 cursor-pointer hover:text-white hover:bg-black border-x-zinc-800">
              {content.aboutButton}
            </p>
          </Link>
        </motion.div>
        <motion.div className="about-image-frame flex items-center justify-center w-full h-auto p-4 m-auto duration-300 ease-in shadow-xl shadow-gray-400 rounded-xl hover:scale-105" initial={{ opacity: 0, x: 35, rotate: 3 }} whileInView={{ opacity: 1, x: 0, rotate: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.8, delay: 0.12 }}>
          <Image src={AboutImg} className="rounded-xl" alt="/" />
        </motion.div>
      </div>
    </section>
  );
};

export default About;
