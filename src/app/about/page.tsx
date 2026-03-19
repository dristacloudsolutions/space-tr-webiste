"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const stats = [
  { value: "22+", label: "Countries" },
  { value: "36+", label: "Power Brands" },
  { value: "36+", label: "Retailers" },
  { value: "100+", label: "Approved POS" },
];

export default function AboutPage() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="pt-32 pb-20 px-6 md:px-12 border-b border-[#27272a]">
        <div className="max-w-[1600px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-[#a1a1aa] text-xs tracking-[0.3em] uppercase">Who We Are</span>
            <h1
              className="text-[clamp(3rem,8vw,7rem)] font-light leading-[0.95] text-[#fafafa] mt-4"
              style={{ fontFamily: "var(--font-cormorant), serif" }}
            >
              Who We
              <br />
              <em className="italic text-[#a1a1aa]">Are</em>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* ── MAIN CONTENT + VIDEO ── */}
      <section className="px-6 md:px-12 py-24 border-b border-[#27272a]">
        <div className="max-w-[1600px] mx-auto">

          {/* Top: text left, video right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
            <FadeIn className="flex flex-col gap-8">
              <span className="text-[#a1a1aa] text-xs tracking-[0.3em] uppercase">Our Story</span>
              <h2
                className="text-[clamp(2rem,4vw,3.5rem)] font-light text-[#fafafa] leading-tight"
                style={{ fontFamily: "var(--font-cormorant), serif" }}
              >
                A premier distributor across Africa and the Indian Subcontinent
              </h2>
              <div className="w-12 h-px bg-[#3f3f46]" />
              <p className="text-[#a1a1aa] leading-relaxed text-base md:text-lg">
                Space is a premier distributor across Africa and the Indian Subcontinent (ISC),
                specialising in the luxury perfume and cosmetic distribution.
              </p>
              <p className="text-[#a1a1aa] leading-relaxed text-base md:text-lg">
                We connect global beauty brands with local partners, bringing international
                products, expertise and standards to regional and developing markets.
              </p>
              <Link
                href="/contact"
                className="self-start inline-flex items-center gap-2 text-[#fafafa] text-sm tracking-wider uppercase border-b border-[#3f3f46] pb-1 hover:border-[#fafafa] transition-colors duration-200"
              >
                Partner With Us <ArrowUpRight size={14} />
              </Link>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div className="relative w-full overflow-hidden" style={{ aspectRatio: "16/9" }}>
                {/* Subtle corner accents */}
                <span className="absolute top-0 left-0 w-8 h-8 border-t border-l border-[#a1a1aa]/40 z-10 pointer-events-none" />
                <span className="absolute top-0 right-0 w-8 h-8 border-t border-r border-[#a1a1aa]/40 z-10 pointer-events-none" />
                <span className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-[#a1a1aa]/40 z-10 pointer-events-none" />
                <span className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-[#a1a1aa]/40 z-10 pointer-events-none" />
                <video
                  src="https://video.wixstatic.com/video/8ab953_8f8b2bb1da114485ba82d815e9840cf8/1080p/mp4/file.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                />
              </div>
            </FadeIn>
          </div>

          {/* Stats */}
          <FadeIn>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#27272a]">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="bg-[#09090b] p-10 md:p-14 flex flex-col gap-3 hover:bg-[#18181b] transition-colors duration-300"
                >
                  <p
                    className="text-[#fafafa] text-[clamp(2.5rem,5vw,4.5rem)] font-light leading-none"
                    style={{ fontFamily: "var(--font-cormorant), serif" }}
                  >
                    {stat.value}
                  </p>
                  <p className="text-[#a1a1aa] text-xs tracking-[0.3em] uppercase">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </FadeIn>

        </div>
      </section>

      {/* ── CTA ── */}
      <section className="px-6 md:px-12 py-24">
        <div className="max-w-[1600px] mx-auto text-center">
          <FadeIn>
            <h2
              className="text-[clamp(2.5rem,6vw,5rem)] font-light text-[#fafafa] leading-tight mb-10"
              style={{ fontFamily: "var(--font-cormorant), serif" }}
            >
              Ready to Enter
              <br />
              <em className="italic text-[#a1a1aa]">New Markets?</em>
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/brands"
                className="inline-flex items-center gap-2 bg-[#fafafa] text-[#09090b] px-8 py-4 text-sm tracking-wider uppercase font-medium hover:bg-[#fffefa] transition-colors duration-200"
              >
                Our Brands <ArrowUpRight size={16} />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 border border-[#3f3f46] text-[#a1a1aa] px-8 py-4 text-sm tracking-wider uppercase hover:border-[#a1a1aa] hover:text-[#fafafa] transition-colors duration-200"
              >
                Contact Us
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
