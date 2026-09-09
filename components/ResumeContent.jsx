"use client";

import { useQuery } from "@tanstack/react-query";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { defaultCv, getCvDownloadUrl } from "../lib/content";
import { loadPortfolioData } from "../lib/firebase";

export default function ResumeContent() {
  const { data } = useQuery({
    queryKey: ["portfolio-content"],
    queryFn: loadPortfolioData,
  });
  const cv = { ...defaultCv, ...(data?.cv || {}) };

  const downloadUrl = getCvDownloadUrl(cv.downloadUrl);

  return (
    <main className="mx-auto max-w-[940px] p-2 pt-[120px]">
      <div className="my-4 flex w-full items-center justify-between bg-[#d0d4d6] p-4">
        <h1 className="text-center text-3xl font-bold">{cv.name}</h1>
        <div className="flex gap-4">
          <a href="https://www.linkedin.com/in/ahmed-mehana-b39967240/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><FaLinkedinIn size={20} /></a>
          <a href="https://github.com/ahmed7mehana?tab=repositories" target="_blank" rel="noreferrer" aria-label="GitHub"><FaGithub size={20} /></a>
        </div>
      </div>
      <div className="py-4 text-center text-xl font-bold uppercase tracking-wider">
        {cv.title} <span className="px-1">|</span> Problem Solving
      </div>
      <p className="leading-8">{cv.summary}</p>
      <div className="py-4 text-center">
        <h2 className="py-2 text-[18px] underline">Skills</h2>
        <p className="leading-8">{cv.skillsText}</p>
      </div>
      <a href={downloadUrl} download target="_blank" rel="noreferrer" className="mx-auto my-5 flex w-fit rounded-lg bg-[#5651e5] px-6 py-3 text-center text-sm font-bold uppercase tracking-wide text-white">
        {cv.downloadLabel}
      </a>
    </main>
  );
}
