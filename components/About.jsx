import React from "react";
import Image from "next/image";
import Link from "next/link";
import AboutImg from "../public/assets/about.jpg";

const About = () => {
  return (
    <div id="about" className="flex items-center w-full p-2 py-16 md:h-screen">
      <div className="max-w-[1240px] m-auto md:grid grid-cols-3 gap-8">
        <div className="col-span-2">
          <p className="uppercase text-xl tracking-widest text-[#5651e5]">
            About
          </p>
          <h2 className="py-4">Who I Am</h2>
          <p className="py-2 text-gray-600">
            I’m Ahmed Mehanna, a MERN Stack developer with experience in
            building professional websites and applications, especially social
            platforms. I deliver clean, responsive designs that work seamlessly
            on all devices. I offer regular Zoom meetings to gather your
            feedback and apply changes smoothly. Flexible with revisions — I’m
            ready to adjust the site even after delivery. You’ll get fast,
            reliable communication to ensure your vision comes to life. My goal
            is to build a long-term partnership, not just complete a project.
            Let’s turn your ideas into a competitive, high-quality website —
            contact me today!
          </p>

          <Link href="/#projects">
            <p className="py-2 text-center text-gray-600 duration-500 border-2 cursor-pointer hover:text-white hover:bg-black border-x-zinc-800">
              Check out-my projects.
            </p>
          </Link>
        </div>
        <div className="flex items-center justify-center w-full h-auto p-4 m-auto duration-300 ease-in shadow-xl shadow-gray-400 rounded-xl hover:scale-105">
          <Image src={AboutImg} className="rounded-xl" alt="/" />
        </div>
      </div>
    </div>
  );
};

export default About;
