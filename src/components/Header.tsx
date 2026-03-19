"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Menu } from "lucide-react";

const navLinks = [
  { href: "/#who-we-are", label: "Who We Are" },
  { href: "/#what-we-offer", label: "What We Offer" },
  { href: "/#portfolio", label: "Portfolio" },
  { href: "/#distribution", label: "Distribution" },
  { href: "/brands", label: "Brands" },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const threshold = pathname === "/" ? window.innerHeight * 2.5 : 20;
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 h-16 flex items-center px-6 md:px-12 transition-all duration-300 ${
          scrolled || menuOpen
            ? "bg-[#09090b]/95 backdrop-blur-sm border-b border-[#27272a]"
            : "bg-transparent"
        }`}
      >
        <div className="w-full max-w-[1600px] mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="text-[#fafafa] text-xl font-semibold tracking-widest uppercase hover:text-[#fffefa] transition-colors duration-200"
            style={{ fontFamily: "var(--font-cormorant), serif" }}
          >
            Space TR
          </Link>

          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`text-sm tracking-wider uppercase transition-colors duration-200 ${
                  pathname === href || pathname.startsWith(href + "/")
                    ? "text-[#fafafa]"
                    : "text-[#a1a1aa] hover:text-[#fafafa]"
                }`}
                style={{ fontFamily: "var(--font-inter), sans-serif" }}
              >
                {label}
              </Link>
            ))}
          </nav>

          <button
            className="md:hidden text-[#a1a1aa] hover:text-[#fafafa] transition-colors"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-0 right-0 z-40 bg-[#09090b]/98 backdrop-blur-sm border-b border-[#27272a] px-6 py-8 md:hidden"
          >
            <nav className="flex flex-col gap-6">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={`text-lg tracking-wider uppercase transition-colors duration-200 ${
                    pathname === href ? "text-[#fafafa]" : "text-[#a1a1aa] hover:text-[#fafafa]"
                  }`}
                  style={{ fontFamily: "var(--font-inter), sans-serif" }}
                >
                  {label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
