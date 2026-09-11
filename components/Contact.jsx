"use client";

import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import { HiOutlineChevronDoubleUp } from "react-icons/hi";

const Contact = () => {
  return (
    <div id="contact" className="w-full ">
      <div className="max-w-[1240px] m-auto px-2 py-16 w-full ">
        <div className="contact-panel">
          <div><p className="text-xl tracking-widest uppercase text-[#5651e5]">Contact</p><h2 className="py-3">Let&apos;s work together.</h2><p className="text-gray-600">Have a project in mind? Send me a message on WhatsApp.</p></div>
          <a className="whatsapp-link" href="https://wa.me/201558533755" target="_blank" rel="noreferrer"><FaWhatsapp size={22} /> WhatsApp</a>
        </div>
        <div className="flex justify-center py-10"><button type="button" className="back-to-top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top"><HiOutlineChevronDoubleUp className="text-[#5651e5]" size={30} /></button></div>
      </div>
    </div>
  );
};

export default Contact;
