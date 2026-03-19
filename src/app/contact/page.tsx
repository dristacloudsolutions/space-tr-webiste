"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowUpRight, Mail, Phone, MapPin } from "lucide-react";

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

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    enquiryType: "",
    market: "",
    message: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  const inputClass =
    "w-full bg-transparent border-b border-[#27272a] focus:border-[#a1a1aa] outline-none py-3 text-[#fafafa] text-sm placeholder-[#3f3f46] transition-colors duration-200";

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
            <span className="text-[#a1a1aa] text-xs tracking-[0.3em] uppercase">Get in Touch</span>
          </motion.div>
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <section className="px-6 md:px-12 py-24">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-20">
          {/* Contact info */}
          <FadeIn>
            <p className="text-[#a1a1aa] text-base leading-relaxed mb-12 max-w-md">
              Whether you are a brand looking to enter Africa or the Indian Subcontinent, a
              retailer seeking distribution partnerships, or a consumer enquiring about our
              products — we would love to hear from you.
            </p>

            <div className="flex flex-col gap-6 mb-16">
              <a
                href="mailto:info@space-tr.com"
                className="flex items-center gap-4 text-[#a1a1aa] hover:text-[#fafafa] transition-colors duration-200 group"
              >
                <div className="w-10 h-10 border border-[#27272a] flex items-center justify-center group-hover:border-[#3f3f46] transition-colors">
                  <Mail size={14} />
                </div>
                <div>
                  <p className="text-xs text-[#3f3f46] tracking-widest uppercase mb-0.5">Email</p>
                  <p className="text-sm">info@space-tr.com</p>
                </div>
              </a>

              <a
                href="tel:+971000000000"
                className="flex items-center gap-4 text-[#a1a1aa] hover:text-[#fafafa] transition-colors duration-200 group"
              >
                <div className="w-10 h-10 border border-[#27272a] flex items-center justify-center group-hover:border-[#3f3f46] transition-colors">
                  <Phone size={14} />
                </div>
                <div>
                  <p className="text-xs text-[#3f3f46] tracking-widest uppercase mb-0.5">Phone</p>
                  <p className="text-sm">+971 00 000 0000</p>
                </div>
              </a>

              <div className="flex items-center gap-4 text-[#a1a1aa]">
                <div className="w-10 h-10 border border-[#27272a] flex items-center justify-center">
                  <MapPin size={14} />
                </div>
                <div>
                  <p className="text-xs text-[#3f3f46] tracking-widest uppercase mb-0.5">HQ</p>
                  <p className="text-sm">Dubai, United Arab Emirates</p>
                </div>
              </div>
            </div>

            <div className="border-t border-[#27272a] pt-8">
              <p className="text-[#3f3f46] text-xs tracking-widest uppercase mb-4">Markets</p>
              <div className="flex flex-wrap gap-2">
                {[
                  "South Africa", "Nigeria", "Kenya", "Ghana",
                  "India", "Pakistan", "Bangladesh", "Sri Lanka",
                ].map((m) => (
                  <span
                    key={m}
                    className="border border-[#27272a] text-[#a1a1aa] text-xs px-3 py-1"
                  >
                    {m}
                  </span>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Form */}
          <FadeIn delay={0.15}>
            {submitted ? (
              <div className="flex flex-col items-start justify-center min-h-[400px] gap-6">
                <div className="w-12 h-12 border border-[#27272a] flex items-center justify-center">
                  <ArrowUpRight size={20} className="text-[#fafafa]" />
                </div>
                <h3
                  className="text-[#fafafa] text-3xl font-light"
                  style={{ fontFamily: "var(--font-cormorant), serif" }}
                >
                  Enquiry Received
                </h3>
                <p className="text-[#a1a1aa] text-sm leading-relaxed max-w-sm">
                  Thank you for reaching out to Space TR. A member of our team will be in touch
                  within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                  <div className="flex flex-col gap-2">
                    <label className="text-[#3f3f46] text-xs tracking-widest uppercase">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className={inputClass}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[#3f3f46] text-xs tracking-widest uppercase">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[#3f3f46] text-xs tracking-widest uppercase">
                    Company / Organization
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={form.company}
                    onChange={handleChange}
                    placeholder="Your company name"
                    className={inputClass}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                  <div className="flex flex-col gap-2">
                    <label className="text-[#3f3f46] text-xs tracking-widest uppercase">
                      Enquiry Type
                    </label>
                    <select
                      name="enquiryType"
                      value={form.enquiryType}
                      onChange={handleChange}
                      className={`${inputClass} cursor-pointer`}
                    >
                      <option value="" className="bg-[#09090b]">Select...</option>
                      <option value="brand-partnership" className="bg-[#09090b]">Brand Partnership</option>
                      <option value="retail-distribution" className="bg-[#09090b]">Retail Distribution</option>
                      <option value="product-enquiry" className="bg-[#09090b]">Product Enquiry</option>
                      <option value="general" className="bg-[#09090b]">General Enquiry</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[#3f3f46] text-xs tracking-widest uppercase">
                      Market of Interest
                    </label>
                    <select
                      name="market"
                      value={form.market}
                      onChange={handleChange}
                      className={`${inputClass} cursor-pointer`}
                    >
                      <option value="" className="bg-[#09090b]">Select...</option>
                      <option value="south-africa" className="bg-[#09090b]">South Africa</option>
                      <option value="nigeria" className="bg-[#09090b]">Nigeria</option>
                      <option value="kenya" className="bg-[#09090b]">Kenya</option>
                      <option value="ghana" className="bg-[#09090b]">Ghana</option>
                      <option value="india" className="bg-[#09090b]">India</option>
                      <option value="pakistan" className="bg-[#09090b]">Pakistan</option>
                      <option value="bangladesh" className="bg-[#09090b]">Bangladesh</option>
                      <option value="sri-lanka" className="bg-[#09090b]">Sri Lanka</option>
                      <option value="multiple" className="bg-[#09090b]">Multiple Markets</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[#3f3f46] text-xs tracking-widest uppercase">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us about your brand, distribution needs, or enquiry..."
                    className={`${inputClass} resize-none`}
                  />
                </div>

                <button
                  type="submit"
                  className="self-start inline-flex items-center gap-2 bg-[#fafafa] text-[#09090b] px-8 py-4 text-sm tracking-wider uppercase font-medium hover:bg-[#fffefa] transition-colors duration-200"
                >
                  Send Enquiry <ArrowUpRight size={16} />
                </button>
              </form>
            )}
          </FadeIn>
        </div>
      </section>
    </>
  );
}
