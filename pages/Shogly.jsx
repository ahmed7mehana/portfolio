import Image from "next/image";
import React from "react";
import Shoglyimg from "../public/assets/shogly.png";

import { RiRadioButtonFill } from "react-icons/ri";
import Link from "next/link";

const Shogly = () => {
  return (
    <div className="w-full">
      <div className="w-screen h-[50vh] relative">
        <div className="absolute top-0 left-0 w-full h-[50vh] bg-black/70 z-10" />
        <Image
          className="absolute z-1"
          layout="fill"
          objectFit="cover"
          src={Shoglyimg}
          alt="/"
        />
        <div className="absolute top-[70%] max-w-[1240px] w-full left-[50%] right-[50%] translate-x-[-50%] translate-y-[-50%] text-white z-10 p-2">
          <h2 className="py-2"> Shogly site </h2>
          <h3> React / Tilwind / PrimeVue</h3>
        </div>
      </div>

      <div className="max-w-[1240px] mx-auto p-2 grid md:grid-cols-5 gap-8 py-8">
        <div className="col-span-4">
          <p>Project</p>
          <h2>Overview</h2>
          <p>
            • Shogly is a secure platform that facilitates transactions between
            entities using unique passwords for data access control. The first
            version includes key sections:
            <br />• Ideas: Showcases beneficial personal and professional ideas.{" "}
            <br />
            • Reports: Records and shares daily reports with access permissions
            based on passwords.
            <br />
            • Excel Integration: Links to an Excel sheet for efficient data
            management.
            <br />
            • Additional pages include `About Me` and `Sections,` with contact
            information. <br />
            The platform features a responsive design, ensuring compatibility
            across devices, and is built with clean, maintainable code following
            modern web development practices.
          </p>
          <a
            href="https://wa.me/+201558533755"
            target="_blank"
            rel="noreferrer"
          >
            <p className="text[8px] font-bold uppercase">
              if u wanna buy it just get tech with me on whatsup
            </p>
            <button className="px-8 py-2 mt-4 mr-8 hover:bg-black hover:scale-1 ">
              Buy ( 5$ )
            </button>
          </a>

          <a
            href=" https://shogly-gnsb.vercel.app/ "
            target="_blank"
            rel="noreferrer"
          >
            <button className="px-8 py-2 mt-4">Demo</button>
          </a>
        </div>
        <div className="col-span-4 py-4 shadow-xl md:col-span-1 shadow-gray-400 rounded-xl">
          <div className="p-2">
            <p className="pb-2 font-bold text-center">Technologies</p>
            <div className="grid grid-cols-3 md:grid-cols-1">
              <p className="flex items-center py-2 text-gray-600">
                <RiRadioButtonFill className="pr-1" /> React
              </p>
              <p className="flex items-center py-2 text-gray-600">
                <RiRadioButtonFill className="pr-1" /> Tailwind
              </p>
            </div>
          </div>
        </div>
        <Link href="/#projects">
          <p className="underline cursor-pointer">Back</p>
        </Link>
      </div>
    </div>
  );
};

export default Shogly;
