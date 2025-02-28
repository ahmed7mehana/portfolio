import Image from "next/image";
import React from "react";
import DreamCart from "../public/assets/Dream-cart.png";
import { RiRadioButtonFill } from "react-icons/ri";
import Link from "next/link";

const property = () => {
  return (
    <div className="w-full">
      <div className="w-screen h-[50vh] relative">
        <div className="absolute top-0 left-0 w-full h-[50vh] bg-black/70 z-10" />
        <Image
          className="absolute z-1"
          layout="fill"
          objectFit="cover"
          src={DreamCart}
          alt="/"
        />
        <div className="absolute top-[70%] max-w-[1240px] w-full left-[50%] right-[50%] translate-x-[-50%] translate-y-[-50%] text-white z-10 p-2">
          <h2 className="py-2">Dream - Cart</h2>
          <h3>Next JS / Tailwind </h3>
        </div>
      </div>

      <div className="max-w-[1240px] mx-auto p-2 grid md:grid-cols-5 gap-8 py-8">
        <div className="col-span-4">
          <p>Project</p>
          <h2>Overview</h2>
          <p>
            In this site I have used (next.js - tailwind), and this site is
            characterized by the features of the light and dark mode, you can
            add products to the cart, After adding products to the possibility
            of actual purchase, communication pages, The (about) page and other
            pages that serve the idea, as well as the possibility of a quick
            search with ease and easy transition between pages, the wish list,
            and logging in to the site, and when you do that, you will find a
            page for you with a summary of all the operations that you performed
            on the site, and the ability to send complaints.
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
            href="https://dream-cart-gsdo-4lovlbcvf-ahmed7mehana.vercel.app/"
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
                <RiRadioButtonFill className="pr-1" /> Next.js
              </p>
              <p className="flex items-center py-2 text-gray-600">
                <RiRadioButtonFill className="pr-1" /> Tailwind
              </p>

              <p className="flex items-center py-2 text-gray-600">
                <RiRadioButtonFill className="pr-1" /> redux toolkit
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

export default property;
