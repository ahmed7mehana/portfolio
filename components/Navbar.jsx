"use client";

import Image from "next/image";
import Link from "next/link";
import { startTransition, useEffect, useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { FiMoon, FiSun } from "react-icons/fi";
import NavLogo from "../public/assets/navLogo.png";

const links = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Skills", href: "/#skills" },
  { label: "Projects", href: "/#projects" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("portfolio-theme");
    const isDark = savedTheme === "dark";
    startTransition(() => setDarkMode(isDark));
    document.documentElement.classList.toggle("dark-mode", isDark);

    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    const nextMode = !darkMode;
    setDarkMode(nextMode);
    document.documentElement.classList.toggle("dark-mode", nextMode);
    window.localStorage.setItem("portfolio-theme", nextMode ? "dark" : "light");
  };

  return (
    <header className={`site-header ${scrolled ? "site-header-scrolled" : ""}`}>
      <nav className="liquid-nav" aria-label="Main navigation">
        <Link href="/" className="nav-mark" aria-label="Home"><span>Am</span></Link>
        <div className="desktop-nav-links">
          {links.map((link) => <Link key={link.href} href={link.href}>{link.label}</Link>)}
        </div>
        <button type="button" className="theme-button" onClick={toggleTheme} aria-label="Toggle dark mode">
          {darkMode ? <FiSun size={17} /> : <FiMoon size={17} />}
        </button>
        <button type="button" className="mobile-menu-button" onClick={() => setOpen(true)} aria-label="Open navigation">
          <AiOutlineMenu size={23} />
        </button>
      </nav>

      <div className={`mobile-nav-overlay ${open ? "mobile-nav-visible" : ""}`} onClick={() => setOpen(false)}>
        <aside className="mobile-nav-panel" onClick={(event) => event.stopPropagation()}>
          <div className="mobile-nav-topline">
            <Link href="/" onClick={() => setOpen(false)}><Image src={NavLogo} width={70} height={60} alt="Ahmed home" /></Link>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close navigation"><AiOutlineClose size={23} /></button>
          </div>
          <p className="mobile-nav-intro">Let&apos;s build something legendary together.</p>
          <div className="mobile-nav-links">
            {links.map((link) => <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>{link.label}</Link>)}
            <button type="button" onClick={toggleTheme}>{darkMode ? "Light mode" : "Dark mode"}</button>
          </div>
        </aside>
      </div>
    </header>
  );
}
