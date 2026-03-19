"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

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

const images = [
  {
    src: "https://static.wixstatic.com/media/nsplsh_6c695a766d367a4e6274~mv2.jpg/v1/fill/w_623,h_831,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/nsplsh_6c695a766d367a4e6274~mv2.jpg",
    alt: "Luxury fragrance",
    style: { top: "5%", left: "2%", width: "16%", aspectRatio: "3/4" },
  },
  {
    src: "https://static.wixstatic.com/media/nsplsh_304c4e766a6a75776f43~mv2.jpg/v1/fill/w_453,h_604,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/nsplsh_304c4e766a6a75776f43~mv2.jpg",
    alt: "Perfume bottle",
    style: { top: "45%", left: "0%", width: "12%", aspectRatio: "3/4" },
  },
  {
    src: "https://static.wixstatic.com/media/nsplsh_5468654172745363656e65~mv2.jpg/v1/fill/w_453,h_604,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/nsplsh_5468654172745363656e65~mv2.jpg",
    alt: "Applying perfume",
    style: { top: "8%", left: "32%", width: "17%", aspectRatio: "3/4" },
  },
  {
    src: "https://static.wixstatic.com/media/nsplsh_626c75655f666c6f776572~mv2.jpg/v1/fill/w_623,h_623,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/nsplsh_626c75655f666c6f776572~mv2.jpg",
    alt: "Luxury perfume with flowers",
    style: { top: "32%", left: "36%", width: "22%", aspectRatio: "1/1" },
  },
  {
    src: "https://static.wixstatic.com/media/nsplsh_5765206172655f53706163655f5452~mv2.jpg/v1/fill/w_760,h_507,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/nsplsh_5765206172655f53706163655f5452~mv2.jpg",
    alt: "Fragrance experience",
    style: { top: "68%", left: "20%", width: "22%", aspectRatio: "3/2" },
  },
  {
    src: "https://static.wixstatic.com/media/nsplsh_4c75787572795f5265746169~mv2.jpg/v1/fill/w_760,h_507,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/nsplsh_4c75787572795f5265746169~mv2.jpg",
    alt: "Partnership",
    style: { top: "5%", right: "2%", width: "20%", aspectRatio: "4/3" },
  },
  {
    src: "https://static.wixstatic.com/media/nsplsh_52657461696c5f53746f7265~mv2.jpg/v1/fill/w_623,h_831,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/nsplsh_52657461696c5f53746f7265~mv2.jpg",
    alt: "Retail store",
    style: { top: "42%", right: "0%", width: "16%", aspectRatio: "3/4" },
  },
];

export default function WhatWeOfferPage() {
  return (
    <div style={{ backgroundColor: "#f0ebe3", minHeight: "100vh" }}>

      {/* ── HEADER ── */}
      <section className="pt-32 pb-12 px-6 md:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1
            className="text-[clamp(2.5rem,8vw,7rem)] font-light leading-none tracking-[0.15em] uppercase text-[#1a1a1a]"
            style={{ fontFamily: "var(--font-cormorant), serif" }}
          >
            What We Offer
          </h1>
        </motion.div>

        <FadeIn delay={0.2}>
          <p className="mt-8 text-[#4a4a4a] text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            We deliver end-to-end solutions — from brand management to logistics — ensuring
            fast, effective market entry. With teams on the ground and regional expertise, we drive
            growth through local retail, Duty-Free and e-commerce, reaching over 1.5 billion
            consumers.
          </p>
        </FadeIn>
      </section>

      {/* ── IMAGE COLLAGE ── */}
      <FadeIn delay={0.3}>
        <section className="relative mx-auto px-4" style={{ maxWidth: 1600, height: "90vh", minHeight: 600 }}>

          {/* Left cluster */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="absolute overflow-hidden"
            style={{ top: "4%", left: "2%", width: "15%", aspectRatio: "3/4" }}
          >
            <img
              src="https://static.wixstatic.com/media/8ab953_992832a6f45a47f4a154b2e37546a306~mv2.gif"
              alt="Luxury fragrance"
              className="w-full h-full object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="absolute overflow-hidden"
            style={{ top: "48%", left: "0%", width: "11%", aspectRatio: "3/4", background: "#d4c5b0" }}
          >
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-[#8a7a6a] text-xs tracking-widest uppercase writing-mode-vertical">Perfume</span>
            </div>
          </motion.div>

          {/* Center-left cluster */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="absolute overflow-hidden"
            style={{ top: "5%", left: "31%", width: "16%", aspectRatio: "3/4", background: "#c8b89a" }}
          >
            <div className="w-full h-full bg-gradient-to-br from-[#c8b89a] to-[#a89070]" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="absolute overflow-hidden"
            style={{ top: "30%", left: "35%", width: "22%", aspectRatio: "1/1", background: "#e8d8c8" }}
          >
            <div className="w-full h-full bg-gradient-to-br from-[#e8d8c8] to-[#c8a888]" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="absolute overflow-hidden"
            style={{ top: "65%", left: "19%", width: "22%", aspectRatio: "3/2", background: "#b8a890" }}
          >
            <div className="w-full h-full bg-gradient-to-br from-[#b8a890] to-[#988068]" />
          </motion.div>

          {/* Right cluster */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="absolute overflow-hidden"
            style={{ top: "4%", right: "2%", width: "19%", aspectRatio: "4/3", background: "#2a3a5a" }}
          >
            <div className="w-full h-full bg-gradient-to-br from-[#2a3a5a] to-[#1a2a3a]" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="absolute overflow-hidden"
            style={{ top: "42%", right: "0%", width: "15%", aspectRatio: "3/4", background: "#d8c8b0" }}
          >
            <div className="w-full h-full bg-gradient-to-br from-[#d8c8b0] to-[#b8a890]" />
          </motion.div>

        </section>
      </FadeIn>

      {/* ── OFFERINGS ── */}
      <section className="px-6 md:px-12 py-24">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#d4c8b8]">
            {[
              {
                number: "01",
                title: "Brand Management",
                description:
                  "We manage every aspect of your brand's presence — positioning, marketing, retail execution, and staff training — to protect equity and drive desirability.",
              },
              {
                number: "02",
                title: "Logistics & Distribution",
                description:
                  "End-to-end supply chain from Dubai to your target markets. Compliant, reliable, and on time — across local retail, Duty-Free, and e-commerce channels.",
              },
              {
                number: "03",
                title: "Market Entry",
                description:
                  "Fast, effective market entry with teams on the ground. We leverage regional expertise to connect your brand with 1.5 billion consumers across 22+ countries.",
              },
            ].map((item, i) => (
              <FadeIn key={item.number} delay={i * 0.1}>
                <div
                  className="p-10 md:p-14 flex flex-col gap-4 min-h-[260px] hover:bg-[#e8ddd0] transition-colors duration-300"
                  style={{ background: "#ebe4db" }}
                >
                  <span className="text-[#9a8a7a] text-xs tracking-widest">{item.number}</span>
                  <h3
                    className="text-[#1a1a1a] text-2xl font-light"
                    style={{ fontFamily: "var(--font-cormorant), serif" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-[#6a5a4a] text-sm leading-relaxed flex-1">{item.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
