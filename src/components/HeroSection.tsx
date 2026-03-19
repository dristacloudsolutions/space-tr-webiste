"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { brandLogos } from "@/lib/brands";

const GIF_URL =
  "https://static.wixstatic.com/media/8ab953_992832a6f45a47f4a154b2e37546a306~mv2.gif";
const GIF_URL_2 =
  "https://static.wixstatic.com/media/8ab953_0c505e95a7ea4f0b9f756ce05f2afc2c~mv2.gif";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftImgRef   = useRef<HTMLImageElement>(null);
  const rightImgRef  = useRef<HTMLImageElement>(null);

  // Reset both GIF instances in the same rAF so they start on frame 0 together
  useEffect(() => {
    requestAnimationFrame(() => {
      if (leftImgRef.current)  leftImgRef.current.src  = GIF_URL_2;
      if (rightImgRef.current) rightImgRef.current.src = GIF_URL_2;
    });
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  /*
   * The container is 200vh.  Timeline (in scroll-progress fractions):
   *
   *  0.00 – 0.05  GIF fully visible, logo overlay shown
   *  0.05 – 0.50  GIF panels split outward  ← animation window
   *  0.50 – 1.00  Panels gone, hero text STATIC — below-page content
   *               slides up from the viewport bottom over this still hero
   *
   * Panels: each is full-screen; clipPath shows its half; the whole div
   * translates ±50% (= ±50 vw) so the clipped half exits the viewport.
   */
  const leftX  = useTransform(scrollYProgress, [0.05, 0.50], ["0%", "-50%"]);
  const rightX = useTransform(scrollYProgress, [0.05, 0.50], ["0%",  "50%"]);

  // Logo fades as split begins; text fades in as split completes
  const logoOpacity    = useTransform(scrollYProgress, [0,    0.08], [1, 0]);
  const logoImgOpacity = useTransform(scrollYProgress, [0.05, 0.18], [0, 1]);
  const logoImgY       = useTransform(scrollYProgress, [0.05, 0.18], [80, 0]);
  const textOpacity    = useTransform(scrollYProgress, [0.30, 0.50], [0, 1]);
  const textY          = useTransform(scrollYProgress, [0.30, 0.50], [30, 0]);
  const hintOpacity    = useTransform(scrollYProgress, [0,    0.06], [1, 0]);

  const fullScreen: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "center center",
    userSelect: "none",
    pointerEvents: "none",
    draggable: false,
  } as React.CSSProperties;

  return (
    <div ref={containerRef} style={{ height: "250vh" }}>
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          width: "100%",
          overflow: "hidden",
          background: "#ffffff",
        }}
      >
        {/* ── LAYER 0a · Logo (fades in during split) ──────────────────────── */}
        <motion.div
          style={{ opacity: logoImgOpacity, y: logoImgY, position: "absolute", inset: 0, zIndex: 0 }}
          className="flex flex-col justify-center items-center text-center px-6 md:px-12 -mt-20"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/Space-Logo-19.png"
            alt="Space TR"
            style={{ width: 480, height: "auto" }}
          />
          <p
            className="mt-8 text-[#6b7280] text-2xl md:text-3xl tracking-wide max-w-2xl leading-snug"
            style={{ fontFamily: "var(--font-cormorant), serif" }}
          >
            Bringing the best of global beauty brands to local audiences.
          </p>
        </motion.div>

        {/* ── LAYER 0b · Hero text (fades in as split completes) ───────────── */}
        <motion.div
          style={{ opacity: textOpacity, y: textY, position: "absolute", inset: 0, zIndex: 0 }}
          className="flex flex-col justify-center items-center text-center px-6 md:px-12 pt-40"
        >
          <div className="max-w-[1600px] mx-auto w-full flex flex-col items-center">
            <span className="text-[#6b7280] text-xs tracking-[0.3em] uppercase mb-6 block">
              Africa · Indian Subcontinent · Dubai
            </span>
            <h1
              className="text-[clamp(3rem,9vw,8rem)] font-light leading-[0.95] tracking-tight text-[#09090b] mb-8"
              style={{ fontFamily: "var(--font-cormorant), serif" }}
            >
              Distributing
              <br />
              <em className="italic text-[#6b7280]">Luxury</em>
              <br />
              Across Continents
            </h1>
            <p className="text-[#6b7280] text-base md:text-lg max-w-lg leading-relaxed mb-12">
              Space TR is a premier distributor of luxury perfumes and cosmetics across Africa
              and the Indian Subcontinent — bringing the world&apos;s finest fragrance brands
              to discerning consumers in emerging markets.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/brands"
                className="inline-flex items-center gap-2 bg-[#09090b] text-white px-8 py-4 text-sm tracking-wider uppercase font-medium hover:bg-[#27272a] transition-colors duration-200"
              >
                Our Brands <ArrowUpRight size={16} />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 border border-[#d4d4d8] text-[#6b7280] px-8 py-4 text-sm tracking-wider uppercase hover:border-[#09090b] hover:text-[#09090b] transition-colors duration-200"
              >
                Partner With Us
              </Link>
            </div>
          </div>
        </motion.div>

        {/* ── LAYER 1 · LEFT half ───────────────────────────────────────────
              Full-screen motion.div translates LEFT on scroll.
              The img inside fills 100% of the div; clipPath hides the right
              half so only the LEFT side of the GIF is visible.
        ──── */}
        <motion.div
          style={{ x: leftX, position: "absolute", inset: 0, zIndex: 10 }}
        >
          <img
            ref={leftImgRef}
            alt="Space TR"
            style={{ ...fullScreen, clipPath: "inset(0 50% 0 0)" }}
          />
        </motion.div>

        {/* ── LAYER 1 · RIGHT half ──────────────────────────────────────────
              Full-screen motion.div translates RIGHT on scroll.
              clipPath hides the left half so only the RIGHT side of the
              GIF is visible. Both imgs share the same URL → same frame.
        ──── */}
        <motion.div
          style={{ x: rightX, position: "absolute", inset: 0, zIndex: 10 }}
        >
          <img
            ref={rightImgRef}
            alt=""
            aria-hidden
            style={{ ...fullScreen, clipPath: "inset(0 0 0 50%)" }}
          />
        </motion.div>

        {/* ── LAYER 2 · Logo overlay ────────────────────────────────────────── */}
        <motion.div
          style={{ opacity: logoOpacity, position: "absolute", inset: 0, zIndex: 20 }}
          className="flex flex-col items-center justify-center pointer-events-none"
        >
          <p
            className="text-white text-5xl md:text-7xl font-light tracking-widest uppercase"
            style={{ fontFamily: "var(--font-cormorant), serif" }}
          >
            Space TR
          </p>
          <p className="text-white/50 text-xs tracking-[0.5em] uppercase mt-4">
            Luxury · Perfumes · Cosmetics
          </p>
        </motion.div>

        {/* ── LAYER 0c · Brand marquee (bottom of revealed section) ────────── */}
        <motion.div
          style={{
            opacity: logoImgOpacity,
            position: "absolute",
            bottom: 48,
            left: 0,
            right: 0,
            zIndex: 1,
            overflow: "hidden",
          }}
          className="py-4 border-t border-[#e5e7eb]"
        >
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
            className="flex gap-6 whitespace-nowrap px-8"
          >
            {[...brandLogos, ...brandLogos].map((b, i) => (
              <div
                key={i}
                className="shrink-0 w-24 h-24 flex items-center justify-center mx-2"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={b.img}
                  alt={b.name}
                  className="w-full h-full object-contain grayscale"
                />
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* ── LAYER 2 · Scroll hint ─────────────────────────────────────────── */}
        <motion.div
          style={{
            opacity: hintOpacity,
            position: "absolute",
            bottom: 32,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 20,
          }}
          className="flex flex-col items-center gap-2 pointer-events-none"
        >
          <span className="text-black/30 text-xs tracking-widest uppercase">Scroll</span>
          <ChevronDown size={16} className="text-black/30 animate-bounce" />
        </motion.div>
      </div>
    </div>
  );
}
