"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
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

  const HERO_IMAGE = "https://static.wixstatic.com/media/8ab953_9d899c3576834de7bbbb1266d1cfc58e~mv2.jpg";

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const leftX  = useTransform(smoothProgress, [0.05, 0.33], ["0%", "-60%"]);
  const rightX = useTransform(smoothProgress, [0.05, 0.33], ["0%",  "60%"]);
  
  const imgParallaxLeft  = useTransform(smoothProgress, [0.05, 0.33], ["0%", "15%"]);
  const imgParallaxRight = useTransform(smoothProgress, [0.05, 0.33], ["0%", "-15%"]);

  const logoOpacity    = useTransform(smoothProgress, [0,    0.05], [1, 0]);
  const logoImgOpacity = useTransform(smoothProgress, [0.10, 0.25], [0, 1]);
  const logoImgY       = useTransform(smoothProgress, [0.10, 0.25], [40, 0]);
  const logoScale      = useTransform(smoothProgress, [0.10, 0.33], [0.95, 1]);
  
  const marqueeOpacity = useTransform(smoothProgress, [0.20, 0.33], [0, 1]);
  const marqueeY       = useTransform(smoothProgress, [0.20, 0.33], [20, 0]);

  return (
    <div ref={containerRef} style={{ height: "300vh" }} className="relative">
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
        {/* ── NOISE OVERLAY ── */}
        <div className="absolute inset-0 z-[100] pointer-events-none opacity-[0.045] mix-blend-overlay"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3%3Cfilter id='noiseFilter'%3%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3%3C/filter%3%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3%3C/svg%3")` }}
        />

        {/* ── LAYER 0a · Revealed Content (Site Identity) ────────────────────── */}
        <motion.div
          style={{ 
            opacity: logoImgOpacity, 
            y: logoImgY, 
            scale: logoScale,
            position: "absolute", 
            inset: 0, 
            zIndex: 0 
          }}
          className="flex flex-col justify-center items-center text-center px-6 md:px-12 -mt-20"
        >
          <motion.div className="relative mb-12">
            <img
              src="/Space-Logo-19.png"
              alt="Space TR"
              style={{ width: 480, height: "auto" }}
              className="relative z-10"
            />
            <div className="absolute inset-x-0 bottom--4 h-px bg-gradient-to-r from-transparent via-[#111] to-transparent opacity-20" />
          </motion.div>

          <div className="overflow-hidden">
            <p
              className="text-[#111] text-xl md:text-2xl tracking-tight max-w-2xl leading-relaxed font-light"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              {"A premier gateway for luxury beauty across emerging markets, connecting the world's most prestigious fragrance houses to elite audiences.".split(" ").map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  animate={logoImgOpacity.get() > 0.4 ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
                  className="inline-block mr-2"
                >
                  {word}
                </motion.span>
              ))}
            </p>
          </div>
        </motion.div>

        {/* ── LAYER 1 · THE LUXURY PANELS ───────────────────────────────────── */}
        {/* LEFT PANEL */}
        <motion.div
          style={{ 
            x: leftX, 
            position: "absolute", 
            inset: 0, 
            zIndex: 30,
            clipPath: "inset(0 50% 0 0)",
            filter: useTransform(smoothProgress, [0.05, 0.33], ["brightness(1)", "brightness(0.9)"])
          }}
        >
          <motion.div 
            style={{ x: imgParallaxLeft, position: "absolute", inset: 0 }}
            className="w-full h-full"
          >
            <img
              src={HERO_IMAGE}
              alt="Luxury Fragrance"
              className="w-full h-full object-cover grayscale-[0.2]"
            />
            {/* Dark Vignette Overlay */}
            <div className="absolute inset-0 bg-black/30" />
          </motion.div>
        </motion.div>

        {/* RIGHT PANEL */}
        <motion.div
          style={{ 
            x: rightX, 
            position: "absolute", 
            inset: 0, 
            zIndex: 30,
            clipPath: "inset(0 0 0 50%)",
            filter: useTransform(smoothProgress, [0.05, 0.33], ["brightness(1)", "brightness(0.9)"])
          }}
        >
          <motion.div 
            style={{ x: imgParallaxRight, position: "absolute", inset: 0 }}
            className="w-full h-full"
          >
            <img
              src={HERO_IMAGE}
              alt=""
              aria-hidden
              className="w-full h-full object-cover grayscale-[0.2]"
            />
            {/* Dark Vignette Overlay */}
            <div className="absolute inset-0 bg-black/30" />
          </motion.div>
        </motion.div>

        {/* ── CENTRAL HEADING OVERLAY (Moves with panels) ─────────────────── */}
        <motion.div
          style={{ 
            position: "absolute", 
            inset: 0, 
            zIndex: 40,
            opacity: logoOpacity,
          }}
          className="flex flex-col items-center justify-center pointer-events-none text-white"
        >
          <div className="relative overflow-hidden px-4 text-center">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1], delay: 0.2 }}
              className="text-6xl md:text-9xl font-semibold tracking-tighter leading-[0.9]"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              Global Brands.
            </motion.h1>
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1], delay: 0.4 }}
              className="text-6xl md:text-9xl font-semibold tracking-tighter mt-2 leading-[0.9]"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              Local Reach.
            </motion.h1>
          </div>
          
          <motion.p
            initial={{ opacity: 0, letterSpacing: "1em" }}
            animate={{ opacity: 1, letterSpacing: "0.25em" }}
            transition={{ duration: 2, delay: 0.8 }}
            className="text-white/60 text-xs md:text-sm uppercase mt-12 font-medium tracking-[0.4em]"
          >
            Pioneering Luxury Distribution
          </motion.p>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-16"
          >
            <div className="w-px h-16 bg-gradient-to-b from-white/60 to-transparent" />
          </motion.div>
        </motion.div>

        {/* ── LAYER 0c · Brand marquee ──────────────────────────────────── */}
        <motion.div
          style={{
            opacity: marqueeOpacity,
            y: marqueeY,
            position: "absolute",
            bottom: 64,
            left: 0,
            right: 0,
            zIndex: 1,
            overflow: "hidden",
          }}
          className="py-12 border-y border-[#18181b]/10 bg-white/40 backdrop-blur-md"
        >
          <div className="absolute inset-y-0 left-0 w-48 bg-gradient-to-r from-white/80 to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-48 bg-gradient-to-l from-white/80 to-transparent z-10" />
          
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="flex gap-24 whitespace-nowrap px-12 items-center"
          >
            {[...brandLogos, ...brandLogos].map((b, i) => (
              <div
                key={i}
                className="shrink-0 w-36 h-20 flex items-center justify-center opacity-40 hover:opacity-100 transition-all duration-700 grayscale hover:grayscale-0"
              >
                <img
                  src={b.img}
                  alt={b.name}
                  className="max-w-full max-h-full object-contain scale-100 hover:scale-110 transition-transform duration-500"
                />
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
