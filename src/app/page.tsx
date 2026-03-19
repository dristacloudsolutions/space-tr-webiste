"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import HeroSection from "@/components/HeroSection";

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
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
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

  const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];
  const textVariants = {
    hidden: { opacity: 0, y: 28 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.75, delay: i * 0.1, ease },
    }),
  };

  return (
    <section ref={sectionRef} id="who-we-are" className="px-6 md:px-12 py-28 border-t border-[#27272a]">
      <div className="max-w-[1600px] mx-auto">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">

          {/* Left — staggered text */}
          <div className="flex flex-col gap-8">
            <motion.span
              custom={0} variants={textVariants} initial="hidden" animate={inView ? "visible" : "hidden"}
              className="text-[#a1a1aa] text-xs tracking-[0.3em] uppercase"
            >
              Who We Are
            </motion.span>

            <motion.h2
              custom={1} variants={textVariants} initial="hidden" animate={inView ? "visible" : "hidden"}
              className="text-[clamp(2rem,5vw,4rem)] font-light text-[#fafafa] leading-tight"
              style={{ fontFamily: "var(--font-cormorant), serif" }}
            >
              A premier distributor across Africa and the
              <br />
              <em className="italic text-[#a1a1aa]">Indian Subcontinent</em>
            </motion.h2>

            {/* Animated divider */}
            <motion.div
              initial={{ scaleX: 0, originX: 0 }}
              animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="w-12 h-px bg-[#a1a1aa]/40"
              style={{ transformOrigin: "left" }}
            />

            <motion.p
              custom={3} variants={textVariants} initial="hidden" animate={inView ? "visible" : "hidden"}
              className="text-[#a1a1aa] leading-relaxed text-base md:text-lg"
            >
              Space is a premier distributor across Africa and the Indian Subcontinent (ISC),
              specialising in the luxury perfume and cosmetic distribution.
            </motion.p>

            <motion.p
              custom={4} variants={textVariants} initial="hidden" animate={inView ? "visible" : "hidden"}
              className="text-[#a1a1aa] leading-relaxed text-base md:text-lg"
            >
              We connect global beauty brands with local partners, bringing international
              products, expertise and standards to regional and developing markets.
            </motion.p>
          </div>

          {/* Right — video with scale entrance + animated corner brackets */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full overflow-hidden"
            style={{ aspectRatio: "16/9" }}
          >
            {/* Corners — draw in */}
            {[
              "top-0 left-0 border-t border-l",
              "top-0 right-0 border-t border-r",
              "bottom-0 left-0 border-b border-l",
              "bottom-0 right-0 border-b border-r",
            ].map((cls, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                className={`absolute w-8 h-8 ${cls} border-[#a1a1aa]/40 z-10 pointer-events-none`}
              />
            ))}
            <video
              src="https://video.wixstatic.com/video/8ab953_8f8b2bb1da114485ba82d815e9840cf8/1080p/mp4/file.mp4"
              autoPlay muted loop playsInline
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>

        {/* Stats — slide up with stagger */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#27272a]">
          {[
            { value: "22+", label: "Countries" },
            { value: "36+", label: "Power Brands" },
            { value: "36+", label: "Retailers" },
            { value: "100+", label: "Approved POS" },
          ].map(({ value, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.4 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="bg-[#09090b] p-10 md:p-14 flex flex-col gap-3 hover:bg-[#18181b] transition-colors duration-300 group"
            >
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.55 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="text-[#fafafa] text-[clamp(2.5rem,5vw,4.5rem)] font-light leading-none group-hover:text-[#a1a1aa] transition-colors duration-500"
                style={{ fontFamily: "var(--font-cormorant), serif" }}
              >
                {value}
              </motion.p>
              <p className="text-[#a1a1aa] text-xs tracking-[0.3em] uppercase">{label}</p>
              {/* Bottom accent line */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={inView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.7 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="h-px bg-[#3f3f46] mt-2"
                style={{ transformOrigin: "left" }}
              />
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

      {/* ── MARQUEE ── */}
      {/* <div className="border-y border-[#27272a] overflow-hidden py-4">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="flex whitespace-nowrap gap-12"
        >
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="text-[#3f3f46] text-sm tracking-widest uppercase">
              {item} &nbsp;·
            </span>
          ))}
        </motion.div>
      </div> */}

      {/* ── WHO WE ARE ── */}
      <WhoWeAreSection />

      {/* ── WHAT WE OFFER ── */}
      <section id="what-we-offer" style={{ backgroundColor: "#f0ebe3" }} className="px-6 md:px-12 py-28">
        <div className="max-w-[1600px] mx-auto">

          {/* Header */}
          <FadeIn className="text-center mb-12">
            <h2
              className="text-[clamp(2.5rem,8vw,7rem)] font-light leading-none tracking-[0.15em] uppercase text-[#1a1a1a]"
              style={{ fontFamily: "var(--font-cormorant), serif" }}
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

          {/* Image collage */}
          <div className="relative w-full mb-24" style={{ height: "80vh", minHeight: 500 }}>

            {/* Left top */}
            <motion.div
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.05 }}
              className="absolute overflow-hidden"
              style={{ top: "2%", left: "2%", width: "15%", aspectRatio: "3/4" }}
            >
              <img src="https://static.wixstatic.com/media/8ab953_992832a6f45a47f4a154b2e37546a306~mv2.gif"
                alt="Luxury fragrance" className="w-full h-full object-cover" />
            </motion.div>

            {/* Left bottom */}
            <motion.div
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.15 }}
              className="absolute overflow-hidden bg-[#d4c5b0]"
              style={{ top: "52%", left: "0%", width: "11%", aspectRatio: "3/4" }}
            />

            {/* Center top-left */}
            <motion.div
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.1 }}
              className="absolute overflow-hidden bg-[#c0a888]"
              style={{ top: "4%", left: "30%", width: "16%", aspectRatio: "3/4" }}
            />

            {/* Center large */}
            <motion.div
              initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.2 }}
              className="absolute overflow-hidden bg-[#e0c8a8]"
              style={{ top: "28%", left: "34%", width: "23%", aspectRatio: "1/1" }}
            />

            {/* Center bottom */}
            <motion.div
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.25 }}
              className="absolute overflow-hidden bg-[#b8a890]"
              style={{ top: "66%", left: "18%", width: "22%", aspectRatio: "3/2" }}
            />

            {/* Right top */}
            <motion.div
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.08 }}
              className="absolute overflow-hidden bg-[#1e2d4a]"
              style={{ top: "2%", right: "2%", width: "20%", aspectRatio: "4/3" }}
            />

            {/* Right bottom */}
            <motion.div
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.18 }}
              className="absolute overflow-hidden bg-[#d8c8b0]"
              style={{ top: "44%", right: "0%", width: "16%", aspectRatio: "3/4" }}
            />

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

      {/* ── OUR DISTRIBUTION ── */}
      <section id="distribution" className="px-6 md:px-12 py-28 border-t border-[#27272a]">
        <div className="max-w-[1600px] mx-auto">

          {/* Header row */}
          <FadeIn className="mb-16">
            <span className="text-[#a1a1aa] text-xs tracking-[0.4em] uppercase">Our Distribution</span>
          </FadeIn>

          {/* Text + Map */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-20">
            <FadeIn className="flex flex-col gap-8">
              <p className="text-[#a1a1aa] text-base md:text-lg leading-relaxed">
                Our strategically located warehouses in UAE, Kenya and Djibouti provide secure
                and efficient routes to destinations across the Indian subcontinent, Indian Ocean
                and Africa.
              </p>
              <p className="text-[#a1a1aa] text-base md:text-lg leading-relaxed">
                Serving Pan-Africa, we provide seamless access through direct flights, road routes
                and daily cargo connections to key destinations such as Addis Ababa, Entebbe,
                Dar es Salaam, Johannesburg, Dakar, Lagos, Kinshasa, Abidjan, Djibouti,
                Casablanca, Algiers, Luanda, Lusaka, Harare and Tunis.
              </p>

              {/* Warehouse hubs */}
              <div className="flex flex-col gap-3 mt-4">
                <p className="text-[#3f3f46] text-xs tracking-[0.3em] uppercase mb-2">Warehouse Hubs</p>
                {["UAE", "Kenya", "Djibouti"].map((hub) => (
                  <div key={hub} className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#a1a1aa] shrink-0" />
                    <span className="text-[#fafafa] text-sm tracking-wide">{hub}</span>
                  </div>
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div className="relative w-full overflow-hidden" style={{ aspectRatio: "4/3" }}>
                <span className="absolute top-0 left-0 w-8 h-8 border-t border-l border-[#a1a1aa]/30 z-10 pointer-events-none" />
                <span className="absolute top-0 right-0 w-8 h-8 border-t border-r border-[#a1a1aa]/30 z-10 pointer-events-none" />
                <span className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-[#a1a1aa]/30 z-10 pointer-events-none" />
                <span className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-[#a1a1aa]/30 z-10 pointer-events-none" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/space-globe-map02.jpg"
                  alt="Distribution map"
                  className="w-full h-full object-cover"
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      </div> {/* end scrolling content wrapper */}
    </>
  );
}
