"use client";

import Link from "next/link";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { FaGithub, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
import { defaultHeader } from "../lib/content";
import { loadPortfolioData } from "../lib/firebase";

const Main = () => {
  const { data } = useQuery({ queryKey: ["portfolio-content"], queryFn: loadPortfolioData });
  const header = { ...defaultHeader, ...(data?.header || {}) };

  return (
    <div id="home" className="w-full h-screen text-center">
      <div className="max-w-[1240px] w-full h-full mx-auto p-2 flex justify-center items-center">
        <div>
          <p className="text-sm tracking-widest text-gray-600 uppercase">{header.eyebrow}</p>
          <h1 className="py-4 text-gray-700">
            Hi, I&apos;m <span className="text-[#5651e5]">{header.name}</span>
          </h1>
          <h1 className="py-2 text-gray-700">{header.role}</h1>
          <p className="py-4 text-gray-600 sm:max-w-[70%] m-auto">{header.description}</p>
          <div className="flex items-center justify-between max-w-[330px] m-auto py-4">
            <a
              href="https://www.linkedin.com/in/ahmed-mehana-b39967240/"
              target="_blank"
              rel="noreferrer"
            >
              <div className="p-6 duration-300 ease-in rounded-full shadow-lg cursor-pointer shadow-gray-400 hover:scale-110">
                <FaLinkedinIn />
              </div>
            </a>
            <a
              href="https://github.com/ahmed7mehana?tab=repositories"
              target="_blank"
              rel="noreferrer"
            >
              <div className="p-6 duration-300 ease-in rounded-full shadow-lg cursor-pointer shadow-gray-400 hover:scale-110">
                <FaGithub />
              </div>
            </a>
            <Link href="/resume">
              <div className=" text-[12px] uppercase font-bold p-6 duration-300 ease-in rounded-full shadow-lg cursor-pointer shadow-gray-400 hover:scale-110">
                CV
              </div>
            </Link>
            <a href="https://wa.me/201558533755" target="_blank" rel="noreferrer" aria-label="Contact Ahmed on WhatsApp">
              <div className="p-6 duration-300 ease-in rounded-full shadow-lg cursor-pointer shadow-gray-400 hover:scale-110 text-[#25D366]"><FaWhatsapp /></div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
