"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import HeroSection from "@/components/HeroSection";
import DomeGallery from "@/components/DomeGallery";
import BrandsGrid from "@/components/BrandsGrid";
import { brandLogos } from "@/lib/brands";

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
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const marqueeItems = [
  "Luxury Perfumes",
  "Cosmetics Distribution",
  "Africa",
  "Indian Subcontinent",
  "Arabian Oud",
  "Premium Fragrances",
  "South Asia",
  "Sub-Saharan Africa",
];

const regions = [
  {
    title: "Africa",
    markets: ["South Africa", "Nigeria", "Kenya", "Ghana", "Tanzania", "Uganda"],
    description:
      "Deep-rooted distribution networks across Sub-Saharan and West Africa, with established retail partnerships in key urban markets.",
  },
  {
    title: "Indian Subcontinent",
    markets: ["India", "Pakistan", "Bangladesh", "Sri Lanka"],
    description:
      "Comprehensive coverage across the world's largest fragrance-consuming region, serving both modern retail and traditional bazaar channels.",
  },
];

function WhoWeAreSection() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];
  const textVariants = {
    hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 1, delay: i * 0.1, ease },
    }),
  };

  return (
    <section ref={sectionRef} id="who-we-are" className="px-6 md:px-12 py-48 border-t border-white/5 bg-[#09090b]">
      <div className="max-w-[1600px] mx-auto">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center mb-32">

          {/* Left — staggered text */}
          <div className="flex flex-col gap-10">
            <div className="space-y-4">
              <motion.span
                custom={0} variants={textVariants} initial="hidden" animate={inView ? "visible" : "hidden"}
                className="text-[#71717a] text-[10px] tracking-[0.5em] uppercase font-semibold"
              >
                Our Essence
              </motion.span>

              <div className="overflow-hidden">
                <motion.h2
                  custom={1} variants={textVariants} initial="hidden" animate={inView ? "visible" : "hidden"}
                  className="text-[clamp(3rem,6vw,5.5rem)] font-semibold text-white leading-[1.1] tracking-tight"
                  style={{ fontFamily: "var(--font-playfair), serif" }}
                >
                  A premier distributor across <br />
                  <span className="italic text-[#a1a1aa] ml-2">Africa & South Asia</span>
                </motion.h2>
              </div>
            </div>

            {/* Animated divider with kinetic ball */}
            <div className="relative w-24 h-px bg-white/10 overflow-hidden">
               <motion.div
                initial={{ scaleX: 0 }}
                animate={inView ? { scaleX: 1 } : {}}
                transition={{ duration: 1.5, ease }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-[#a1a1aa] to-transparent origin-left"
               />
            </div>

            <div className="space-y-6 max-w-xl">
              <motion.p
                custom={3} variants={textVariants} initial="hidden" animate={inView ? "visible" : "hidden"}
                className="text-[#a1a1aa] leading-relaxed text-lg md:text-xl font-light"
              >
                Space TR stands at the intersection of global luxury and regional expertise, 
                specialising in the sophisticated distribution of perfumes and cosmetics 
                across the world&apos;s most dynamic emerging markets.
              </motion.p>

              <motion.p
                custom={4} variants={textVariants} initial="hidden" animate={inView ? "visible" : "hidden"}
                className="text-[#71717a] leading-relaxed text-base md:text-lg font-light"
              >
                We bridge the gap between international standards and local reach, ensuring that 
                global beauty brands find a resonant voice across Africa and the Indian Subcontinent.
              </motion.p>
            </div>
          </div>

          {/* Right — video with refined depth */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, x: 20 }}
            animate={inView ? { opacity: 1, scale: 1, x: 0 } : {}}
            transition={{ duration: 1.2, delay: 0.2, ease }}
            className="relative w-full overflow-hidden rounded-lg shadow-[0_30px_60px_-15px_rgba(0,0,0,0.7)]"
            style={{ aspectRatio: "16/9" }}
          >
            {/* Corner brackets with motion */}
            {[
              "top-6 left-6 border-t border-l",
              "top-6 right-6 border-t border-r",
              "bottom-6 left-6 border-b border-l",
              "bottom-6 right-6 border-b border-r",
            ].map((cls, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 1, delay: 0.6 + i * 0.1, ease }}
                className={`absolute w-10 h-10 ${cls} border-white/20 z-10 pointer-events-none`}
              />
            ))}
            
            <video
              src="https://video.wixstatic.com/video/8ab953_8f8b2bb1da114485ba82d815e9840cf8/1080p/mp4/file.mp4"
              autoPlay muted loop playsInline
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
            />
            {/* Premium Vignette */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#09090b]/40 via-transparent to-white/5 pointer-events-none" />
          </motion.div>
        </div>

        {/* Stats — Indiced Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 border border-white/5 rounded-xl overflow-hidden shadow-2xl">
          {[
            { value: "22+", label: "Countries" },
            { value: "36+", label: "Power Brands" },
            { value: "36+", label: "Retailers" },
            { value: "100+", label: "Approved POS" },
          ].map(({ value, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.5 + i * 0.1, ease }}
              className="bg-[#09090b] p-12 md:p-16 flex flex-col gap-6 hover:bg-[#121214] transition-all duration-700 group relative"
            >
              <span className="text-white/10 text-xs tracking-widest font-mono">0{i + 1}</span>
              <div className="space-y-1">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.7 + i * 0.1, ease }}
                  className="text-white text-[clamp(3.5rem,6vw,5.5rem)] font-semibold leading-none tracking-tighter"
                  style={{ fontFamily: "var(--font-playfair), serif" }}
                >
                  {value}
                </motion.p>
                <p className="text-[#71717a] text-[10px] tracking-[0.4em] uppercase font-semibold">{label}</p>
              </div>
              {/* Animated Progress Line */}
              <div className="absolute bottom-0 left-0 h-[2px] bg-white/20 w-0 group-hover:w-full transition-all duration-700 ease-in-out" />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      {/* ── HERO ── */}
      <HeroSection />

      {/*
        ── SCROLLING CONTENT ──────────────────────────────────────────────────
        The hero container is 300vh.
        Split completes at 100vh (0.33 progress).
        The hero is sticky for 200vh (300vh parent - 100vh sticky child).
        By setting marginTop: -100vh, this content starts at 200vh from page top.
        From scroll 100vh to 200vh, this block slides UP from the viewport bottom,
        covering the still-sticky revealed hero screen.
      ── */}
      <div style={{ position: "relative", zIndex: 10, backgroundColor: "#09090b", marginTop: "-100vh" }}>
        
        {/* ── BRANDS GRID ── */}
        <BrandsGrid />

        {/* ── WHO WE ARE ── */}
        <WhoWeAreSection />

      {/* ── WHAT WE OFFER ── */}
      <section id="what-we-offer" style={{ backgroundColor: "#f0ebe3" }} className="px-6 md:px-12 py-48">
        <div className="max-w-[1600px] mx-auto">

          {/* Header */}
          <FadeIn className="text-center mb-24">
            <h2
              className="text-[clamp(3rem,8vw,8rem)] font-semibold leading-none tracking-tighter uppercase text-[#1a1a1a]"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              What We Offer
            </h2>
            <p className="mt-8 text-[#4a4a4a] text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
              We deliver end-to-end solutions — from brand management to logistics — ensuring
              fast, effective market entry. With teams on the ground and regional expertise, we drive
              growth through local retail, Duty-Free and e-commerce, reaching over 1.5 billion
              consumers.
            </p>
          </FadeIn>

          {/* Image collage with parallax depth */}
          <div className="relative w-full mb-32" style={{ height: "100vh", minHeight: 600 }}>

            {/* Left top — Depth: Deepest */}
            <motion.div
              initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 1.2, delay: 0.1 }}
              className="absolute overflow-hidden shadow-2xl"
              style={{ top: "5%", left: "5%", width: "18%", aspectRatio: "3/4", zIndex: 1 }}
            >
              <motion.img 
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.8 }}
                src="https://static.wixstatic.com/media/8ab953_992832a6f45a47f4a154b2e37546a306~mv2.gif"
                alt="Luxury fragrance" className="w-full h-full object-cover" />
            </motion.div>

            {/* Left bottom — Depth: Mid */}
            <motion.div
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 1.2, delay: 0.3 }}
              className="absolute overflow-hidden bg-[#d4c5b0]/20 backdrop-blur-sm border border-white/10"
              style={{ top: "55%", left: "0%", width: "14%", aspectRatio: "3/4", zIndex: 2 }}
            />

            {/* Center large — Focal Point */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 100 }} whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="absolute overflow-hidden shadow-2xl"
              style={{ top: "15%", left: "30%", width: "40%", height: "60%", zIndex: 5 }}
            >
               <img 
                src="https://static.wixstatic.com/media/8ab953_0c505e95a7ea4f0b9f756ce05f2afc2c~mv2.gif"
                alt="Main showcase" className="w-full h-full object-cover" />
            </motion.div>

            {/* Right bottom — Depth: Foreground */}
            <motion.div
              initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 1.2, delay: 0.5 }}
              className="absolute overflow-hidden bg-[#1a1a1a] shadow-2xl"
              style={{ bottom: "5%", right: "5%", width: "22%", aspectRatio: "1/1", zIndex: 6 }}
            >
               <div className="p-8 h-full flex flex-col justify-end bg-gradient-to-t from-black/80 to-transparent">
                  <p className="text-white text-xs tracking-[0.4em] uppercase mb-2">Curated</p>
                  <h4 className="text-white text-3xl font-light" style={{ fontFamily: "var(--font-cormorant), serif" }}>Heritage</h4>
               </div>
            </motion.div>

          </div>

          {/* Offerings grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#d4c8b8]">
            {[
              {
                number: "01",
                title: "Brand Management",
                description: "We manage every aspect of your brand's presence — positioning, marketing, retail execution, and staff training — to protect equity and drive desirability.",
              },
              {
                number: "02",
                title: "Logistics & Distribution",
                description: "End-to-end supply chain from Dubai to your target markets. Compliant, reliable, and on time — across local retail, Duty-Free, and e-commerce channels.",
              },
              {
                number: "03",
                title: "Market Entry",
                description: "Fast, effective market entry with teams on the ground. We leverage regional expertise to connect your brand with 1.5 billion consumers across 22+ countries.",
              },
            ].map((item, i) => (
              <FadeIn key={item.number} delay={i * 0.1}>
                <div className="p-10 md:p-14 flex flex-col gap-4 min-h-[260px] hover:bg-[#e8ddd0] transition-colors duration-300" style={{ background: "#ebe4db" }}>
                  <span className="text-[#9a8a7a] text-xs tracking-widest">{item.number}</span>
                  <h3 className="text-[#1a1a1a] text-2xl font-light" style={{ fontFamily: "var(--font-cormorant), serif" }}>
                    {item.title}
                  </h3>
                  <p className="text-[#6a5a4a] text-sm leading-relaxed flex-1">{item.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Two-column text */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mt-24 mb-24">
            <FadeIn>
              <p className="text-[#4a4a4a] text-base md:text-lg leading-relaxed">
                We actively drive brand awareness through dynamic marketing strategies like in-store
                activation and launch events that increase brand visibility and fostering enthusiasm.
                We don&apos;t just promote the product – we create an experience that resonates with
                consumers on a deeper level, that builds customer loyalty and emotional engagement.
              </p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="text-[#4a4a4a] text-base md:text-lg leading-relaxed">
                The regional team plays a pivotal role in ensuring seamless and efficient operations.
                By leveraging their in-depth local insights and exceptional logistical expertise, we
                gain a distinct advantage in navigating complex customs processes and securing timely,
                reliable deliveries.
              </p>
            </FadeIn>
          </div>

          {/* Our Services */}
          <FadeIn>
            <div className="border-t border-[#c8b8a8] pt-16">
              <span className="text-[#9a8a7a] text-xs tracking-[0.4em] uppercase block mb-12">Our Services</span>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#c8b8a8]">
                {[
                  "Team / BA Management",
                  "Visual Merchandising",
                  "Sales & Operations",
                  "BA Training",
                  "Stock & Supplies",
                  "Launches, Activations, Marketing & Promotional Activities",
                ].map((service, i) => (
                  <motion.div
                    key={service}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                    className="p-8 md:p-10 flex items-start gap-4 hover:bg-[#e0d4c4] transition-colors duration-300"
                    style={{ background: "#ebe4db" }}
                  >
                    <span className="text-[#9a8a7a] text-xs tracking-widest mt-1 shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p
                      className="text-[#1a1a1a] text-lg font-light leading-snug"
                      style={{ fontFamily: "var(--font-cormorant), serif" }}
                    >
                      {service}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </FadeIn>

        </div>
      </section>

      {/* ── OUR PORTFOLIO (3D GALLERY) ── */}
      <section id="portfolio" className="relative py-28 overflow-hidden bg-[#09090b]">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 mb-16">
          <FadeIn>
            <span className="text-[#a1a1aa] text-xs tracking-[0.4em] uppercase block mb-4">Our Portfolio</span>
            <h2 
              className="text-[clamp(3rem,6vw,6rem)] font-semibold leading-tight text-white tracking-tight"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              Partnering with <em className="italic font-light text-[#a1a1aa]">world-class</em> beauty brands.
            </h2>
          </FadeIn>
        </div>

        <div style={{ height: "80vh", width: "100%", position: "relative" }}>
          <DomeGallery 
            images={brandLogos.map(b => ({ src: b.img, alt: b.name }))}
            grayscale={true}
            minRadius={500}
            maxRadius={1000}
            overlayBlurColor="#09090b"
          />
        </div>
      </section>
      {/* ── OUR DISTRIBUTION ── */}
      <section id="distribution" className="px-6 md:px-12 py-32 border-t border-white/5 bg-[#09090b]">
        <div className="max-w-[1600px] mx-auto">

          {/* Header row */}
          <FadeIn className="mb-20">
            <span className="text-[#71717a] text-[10px] tracking-[0.5em] uppercase font-semibold">Global Logistics</span>
            <h2 
              className="text-[clamp(3rem,6vw,6.5rem)] font-semibold leading-none text-white mt-8 tracking-tighter"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              Strategically <em className="italic font-light text-[#a1a1aa]">Connected</em>.
            </h2>
          </FadeIn>

          {/* Text + Map */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start mb-20">
            <FadeIn className="flex flex-col gap-10">
              <div className="space-y-8">
                <p className="text-[#a1a1aa] text-lg md:text-xl leading-relaxed font-light">
                  Our strategically located warehouses in <span className="text-white">UAE, Kenya and Djibouti</span> provide secure
                  and efficient routes to destinations across the Indian subcontinent, Indian Ocean
                  and Africa.
                </p>
                <p className="text-[#a1a1aa] text-lg leading-relaxed font-light">
                  Serving Pan-Africa, we provide seamless access through direct flights, road routes
                  and daily cargo connections to key destinations. From Johannesburg to Casablanca, 
                  our network reaches over 1.5 billion consumers.
                </p>
              </div>

              {/* Warehouse hubs */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-12 border-t border-white/5">
                {["UAE", "Kenya", "Djibouti"].map((hub) => (
                  <div key={hub} className="flex flex-col gap-2 p-6 bg-white/[0.02] border border-white/5 hover:border-white/20 transition-all duration-500 rounded-lg group">
                    <span className="text-[#71717a] text-[8px] tracking-[0.3em] uppercase">Warehouse Hub</span>
                    <span className="text-[#fafafa] text-xl font-light group-hover:text-white transition-colors" style={{ fontFamily: "var(--font-cormorant), serif" }}>{hub}</span>
                  </div>
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="relative w-full overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/5 rounded-2xl group" style={{ aspectRatio: "4/3" }}>
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-10" />
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                  src="/space-globe-map02.jpg"
                  alt="Distribution map"
                  className="w-full h-full object-cover"
                />
                {/* HUD Elements */}
                <div className="absolute top-8 left-8 flex items-center gap-3 z-20 pointer-events-none">
                   <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.8)]" />
                   <span className="text-white text-[10px] tracking-widest uppercase bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">Active Routes</span>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      </div> {/* end scrolling content wrapper */}
    </>
  );
}
