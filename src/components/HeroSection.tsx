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

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Smooth progress for ultra-fluid motion
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  /*
   * The container is 300vh.
   *  0.00 – 0.05  GIF fully visible
   *  0.05 – 0.33  GIF panels split outward
   *  0.33 – 0.66  Revealed content remains sticky
   *  0.66 – 1.00  Following content scrolls over
   */
  const leftX  = useTransform(smoothProgress, [0.05, 0.33], ["0%", "-60%"]);
  const rightX = useTransform(smoothProgress, [0.05, 0.33], ["0%",  "60%"]);
  
  // Parallax effect: the imagery moves slower than the panels
  const imgParallaxLeft  = useTransform(smoothProgress, [0.05, 0.33], ["0%", "15%"]);
  const imgParallaxRight = useTransform(smoothProgress, [0.05, 0.33], ["0%", "-15%"]);

  const logoOpacity    = useTransform(smoothProgress, [0,    0.05], [1, 0]);
  const logoImgOpacity = useTransform(smoothProgress, [0.10, 0.25], [0, 1]);
  const logoImgY       = useTransform(smoothProgress, [0.10, 0.25], [40, 0]);
  const logoScale      = useTransform(smoothProgress, [0.10, 0.33], [0.95, 1]);
  
  const marqueeOpacity = useTransform(smoothProgress, [0.20, 0.33], [0, 1]);
  const marqueeY       = useTransform(smoothProgress, [0.20, 0.33], [20, 0]);

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

  const springConfig = { stiffness: 100, damping: 30 };

  return (
    <div ref={containerRef} style={{ height: "300vh" }}>
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
        <div className="absolute inset-0 z-[100] pointer-events-none opacity-[0.035] mix-blend-overlay"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3%3Cfilter id='noiseFilter'%3%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3%3C/filter%3%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3%3C/svg%3")` }}
        />

        {/* ── LAYER 0a · Revealed Content ──────────────────────────────────── */}
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
              style={{ width: 440, height: "auto" }}
              className="relative z-10"
            />
            {/* Subtle glow behind logo */}
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#e5e7eb] to-transparent" />
          </motion.div>

          <div className="overflow-hidden">
            <p
              className="text-[#6b7280] text-2xl md:text-3xl tracking-tight max-w-2xl leading-relaxed italic"
              style={{ fontFamily: "var(--font-cormorant), serif" }}
            >
              {"Bringing the best of global beauty brands to local audiences.".split(" ").map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={logoImgOpacity.get() > 0.5 ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                  className="inline-block mr-2"
                >
                  {word}
                </motion.span>
              ))}
            </p>
          </div>
        </motion.div>

        {/* ── LAYER 1 · LEFT half ─────────────────────────────────────────── */}
        <motion.div
          style={{ 
            x: leftX, 
            position: "absolute", 
            inset: 0, 
            zIndex: 10,
            filter: useTransform(smoothProgress, [0.05, 0.25], ["blur(0px)", "blur(10px)"])
          }}
        >
          <motion.img
            ref={leftImgRef}
            alt="Space TR"
            style={{ 
              ...fullScreen, 
              clipPath: "inset(0 50% 0 0)",
              x: imgParallaxLeft 
            }}
          />
        </motion.div>

        {/* ── LAYER 1 · RIGHT half ────────────────────────────────────────── */}
        <motion.div
          style={{ 
            x: rightX, 
            position: "absolute", 
            inset: 0, 
            zIndex: 10,
            filter: useTransform(smoothProgress, [0.05, 0.25], ["blur(0px)", "blur(10px)"])
          }}
        >
          <motion.img
            ref={rightImgRef}
            alt=""
            aria-hidden
            style={{ 
              ...fullScreen, 
              clipPath: "inset(0 0 0 50%)",
              x: imgParallaxRight 
            }}
          />
        </motion.div>

        {/* ── LAYER 2 · Initial Logo Overlay ─────────────────────────────── */}
        <motion.div
          style={{ opacity: logoOpacity, position: "absolute", inset: 0, zIndex: 20 }}
          className="flex flex-col items-center justify-center pointer-events-none"
        >
          <div className="relative">
            <motion.p
              initial={{ letterSpacing: "1em", opacity: 0 }}
              animate={{ letterSpacing: "0.25em", opacity: 1 }}
              transition={{ duration: 2, ease: "easeOut" }}
              className="text-white text-5xl md:text-8xl font-light uppercase"
              style={{ fontFamily: "var(--font-cormorant), serif" }}
            >
              Space TR
            </motion.p>
          </div>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-white/40 text-[10px] tracking-[0.8em] uppercase mt-8 font-medium"
          >
            Luxury · Perfumes · Cosmetics
          </motion.p>
          
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-12"
          >
            <div className="w-px h-12 bg-gradient-to-b from-white/50 to-transparent" />
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
          className="py-10 border-y border-[#e5e7eb]/50 bg-white/50 backdrop-blur-sm"
        >
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10" />
          
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="flex gap-16 whitespace-nowrap px-8 items-center"
          >
            {[...brandLogos, ...brandLogos].map((b, i) => (
              <div
                key={i}
                className="shrink-0 w-32 h-16 flex items-center justify-center opacity-40 hover:opacity-100 transition-opacity duration-500 grayscale hover:grayscale-0"
              >
                <img
                  src={b.img}
                  alt={b.name}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
