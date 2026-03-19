"use client";

import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { brandLogos } from "@/lib/brands";

const navLinks = [
  { href: "/brands", label: "Brands" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const Offices = [
  "U.A.E.",
  "Kenya",
  "France"
];

export default function Footer() {
  return (
    <>
      {/* ── BRAND MARQUEE STRIP ── */}
      <div className="border-t border-[#27272a] bg-[#09090b] py-6 overflow-hidden">
        <motion.div
          animate={{ x: ["0%", "-80%"] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="flex gap-2"
        >
          {[...brandLogos, ...brandLogos].map((b, i) => (
            <div
              key={i}
              className="shrink-0 w-30 h-30 flex items-center justify-center p-3"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={b.img}
                alt={b.name}
                className="w-full h-full object-contain grayscale hover:opacity-60 hover:grayscale-0 transition-all duration-500"
              />
            </div>
          ))}
        </motion.div>
      </div>

      <footer className="border-t border-[#27272a] bg-[#09090b] px-6 md:px-12 py-16">
      <div className="max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-1">
            <p
              className="text-[#fafafa] text-2xl font-semibold tracking-widest uppercase mb-4"
              style={{ fontFamily: "var(--font-cormorant), serif" }}
            >
              Space TR
            </p>
            <p className="text-[#a1a1aa] text-sm leading-relaxed">
              Premier distributor of luxury perfumes and cosmetics across Africa
              and the Indian Subcontinent.
            </p>
            <p className="text-[#a1a1aa] text-sm leading-relaxed">WAREHOUSES: U.A.E  |  KENYA   |  SWITZERLAND</p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-[#e4e4e7] text-xs tracking-widest uppercase mb-6">Navigation</p>
            <nav className="flex flex-col gap-3">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-[#a1a1aa] hover:text-[#fafafa] text-sm transition-colors duration-200"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>
          {/* Warehouses */}
          <div>
            <p className="text-[#e4e4e7] text-xs tracking-widest uppercase mb-6">Markets</p>
            <div className="flex flex-col gap-1">
              {Offices.map((office) => (
                <span key={office} className="text-[#a1a1aa] text-sm">
                  {office}
                </span>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="text-[#e4e4e7] text-xs tracking-widest uppercase mb-6">Contact</p>
            <div className="flex flex-col gap-3">
              <a
                href="mailto:info@space-tr.com"
                className="flex items-center gap-3 text-[#a1a1aa] hover:text-[#fafafa] text-sm transition-colors duration-200"
              >
                <Mail size={14} />
                info@space-tr.com
              </a>
              <a
                href="tel:+971000000000"
                className="flex items-center gap-3 text-[#a1a1aa] hover:text-[#fafafa] text-sm transition-colors duration-200"
              >
                <Phone size={14} />
                +971 00 000 0000
              </a>
              <span className="flex items-center gap-3 text-[#a1a1aa] text-sm">
                <MapPin size={14} />
                Dubai World Centre, Dubai U.A.E
              </span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-8 border-t border-[#27272a] pb-10">
          <p className="text-[#3f3f46] text-xs">
            © {new Date().getFullYear()} Space TR. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {[
              { href: "https://linkedin.com", label: "LinkedIn" },
              { href: "https://instagram.com", label: "Instagram" },
            ].map(({ href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#3f3f46] hover:text-[#fafafa] text-xs tracking-widest uppercase transition-colors duration-200"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
    </>
  );
}
