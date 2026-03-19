"use client";

import { motion } from "framer-motion";
import { brandLogos } from "@/lib/brands";

export default function BrandsGrid() {
  return (
    <section className="py-32 bg-white text-[#111]">
      <div className="max-width-container px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xs uppercase tracking-[0.4em] text-[#888] font-medium mb-4 block"
            >
              Our Partners
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-semibold tracking-tight"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              The Portfolio of <br /> Excellence.
            </motion.h2>
          </div>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-[#666] max-w-sm text-lg font-light leading-relaxed"
          >
            We proudly represent the world's most prestigious fragrance and beauty houses across our exclusive territories.
          </motion.p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-px bg-[#eee] border border-[#eee]">
          {brandLogos.map((brand, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 6) * 0.05 }}
              whileHover={{ backgroundColor: "#fafafa" }}
              className="bg-white aspect-square flex items-center justify-center p-8 transition-colors duration-500 group"
            >
              <motion.img
                src={brand.img}
                alt={brand.name}
                whileHover={{ scale: 1.05 }}
                className="max-w-full max-h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-700 opacity-60 group-hover:opacity-100"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
