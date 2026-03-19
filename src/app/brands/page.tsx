"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { brandLogos } from "@/lib/brands";
import DomeGallery from "@/components/DomeGallery";

const images = brandLogos.map(b => ({ src: b.img, alt: b.name }));

export default function BrandsPage() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="pt-32 pb-12 px-6 md:px-12 border-b border-[#27272a]">
        <div className="max-w-[1600px] mx-auto flex items-end justify-between">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-[#a1a1aa] text-xs tracking-[0.3em] uppercase">Our Portfolio</span>
            <h1
              className="text-[clamp(3rem,8vw,7rem)] font-light leading-[0.95] text-[#fafafa] mt-4"
              style={{ fontFamily: "var(--font-cormorant), serif" }}
            >
              Brand
              <br />
              <em className="italic text-[#a1a1aa]">Portfolio</em>
            </h1>
            <p className="text-[#a1a1aa] text-base md:text-lg max-w-xl leading-relaxed mt-6">
              Partnering with the world&apos;s finest luxury fragrance and cosmetics houses —
              distributing across Africa and the Indian Subcontinent.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── DOME GALLERY ── */}
      <section style={{ height: "100vh", backgroundColor: "#09090b" }}>
        <DomeGallery
          images={images}
          fit={0.8}
          minRadius={600}
          maxVerticalRotationDeg={0}
          segments={34}
          dragDampening={2}
          grayscale={false}
          overlayBlurColor="#09090b"
          imageBorderRadius="8px"
          openedImageBorderRadius="12px"
          openedImageWidth="500px"
          openedImageHeight="500px"
        />
      </section>

      {/* ── PARTNER CTA ── */}
      <section className="px-6 md:px-12 py-28 border-t border-[#27272a]">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-[#a1a1aa] text-xs tracking-[0.3em] uppercase">Brand Partners</span>
            <h2
              className="text-[clamp(2rem,4vw,3.5rem)] font-light text-[#fafafa] mt-4 leading-tight"
              style={{ fontFamily: "var(--font-cormorant), serif" }}
            >
              Want Your Brand
              <br />
              <em className="italic text-[#a1a1aa]">In Our Markets?</em>
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-[#a1a1aa] leading-relaxed mb-8">
              We are always open to partnerships with premium fragrance and cosmetics brands
              looking to expand into Africa and the Indian Subcontinent. Our distribution network,
              market expertise, and retail relationships make us the ideal entry partner.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#fafafa] text-[#09090b] px-8 py-4 text-sm tracking-wider uppercase font-medium hover:bg-[#fffefa] transition-colors duration-200"
            >
              Become a Partner <ArrowUpRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
