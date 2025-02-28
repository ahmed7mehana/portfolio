import Link from "next/link";
import React from "react";
import { HiOutlineChevronDoubleUp } from "react-icons/hi";

const Contact = () => {
  return (
    <div id="contact" className="w-full ">
      <div className="max-w-[1240px] m-auto px-2 py-16 w-full ">
        <div className="grid gap-8 lg:grid-cols-5"></div>
        <div className="flex justify-center py-12">
          <Link href="/">
            <a>
              <div className="p-4 duration-300 ease-in rounded-full shadow-lg cursor-pointer shadow-gray-400 hover:scale-110">
                <HiOutlineChevronDoubleUp
                  className="text-[#5651e5]"
                  size={30}
                />
              </div>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Contact;
