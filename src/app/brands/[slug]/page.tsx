import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight, ArrowLeft, MapPin, CheckCircle2 } from "lucide-react";
import { brands, getBrandBySlug } from "@/lib/brands";

export async function generateStaticParams() {
  return brands.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const brand = getBrandBySlug(slug);
  if (!brand) return {};
  return {
    title: `${brand.name} — Space TR`,
    description: brand.description,
  };
}

export default async function BrandDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const brand = getBrandBySlug(slug);
  if (!brand) notFound();

  const currentIndex = brands.findIndex((b) => b.slug === slug);
  const nextBrand = brands[(currentIndex + 1) % brands.length];

  return (
    <>
      {/* ── HERO ── */}
      <section className="pt-32 pb-20 px-6 md:px-12 border-b border-[#27272a]">
        <div className="max-w-[1600px] mx-auto">
          <Link
            href="/brands"
            className="inline-flex items-center gap-2 text-[#a1a1aa] hover:text-[#fafafa] text-sm transition-colors duration-200 mb-12"
          >
            <ArrowLeft size={14} />
            All Brands
          </Link>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
            <div className="md:col-span-8">
              <span className="text-[#3f3f46] text-xs tracking-widest">{brand.number}</span>
              <h1
                className="text-[clamp(3rem,8vw,7rem)] font-light leading-[0.95] text-[#fafafa] mt-4"
                style={{ fontFamily: "var(--font-cormorant), serif" }}
              >
                {brand.name}
              </h1>
              <p className="text-[#a1a1aa] text-xs tracking-[0.3em] uppercase mt-4">
                {brand.category}
              </p>
            </div>

            <div className="md:col-span-4 flex flex-col gap-3 md:items-end">
              <div className="flex items-center gap-2 text-[#a1a1aa] text-sm">
                <MapPin size={14} />
                {brand.origin}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STORY & HIGHLIGHTS ── */}
      <section className="px-6 md:px-12 py-20 border-b border-[#27272a]">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <span className="text-[#a1a1aa] text-xs tracking-[0.3em] uppercase">Brand Story</span>
            <p className="text-[#d4d4d8] leading-relaxed mt-6 text-base md:text-lg">
              {brand.story}
            </p>
          </div>

          <div>
            <span className="text-[#a1a1aa] text-xs tracking-[0.3em] uppercase">Why This Brand</span>
            <ul className="mt-6 flex flex-col gap-4">
              {brand.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-3 text-[#d4d4d8] text-sm leading-relaxed">
                  <CheckCircle2 size={16} className="text-[#3f3f46] mt-0.5 shrink-0" />
                  {h}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── MARKETS ── */}
      <section className="px-6 md:px-12 py-20 border-b border-[#27272a]">
        <div className="max-w-[1600px] mx-auto">
          <span className="text-[#a1a1aa] text-xs tracking-[0.3em] uppercase">
            Where We Distribute {brand.name}
          </span>
          <div className="mt-10 flex flex-wrap gap-3">
            {brand.markets.map((market) => (
              <span
                key={market}
                className="border border-[#27272a] hover:border-[#3f3f46] text-[#a1a1aa] hover:text-[#fafafa] text-sm px-5 py-2 tracking-wider transition-colors duration-200"
              >
                {market}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="px-6 md:px-12 py-20 border-b border-[#27272a] bg-[#18181b]">
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <h2
              className="text-[clamp(2rem,4vw,3.5rem)] font-light text-[#fafafa] leading-tight"
              style={{ fontFamily: "var(--font-cormorant), serif" }}
            >
              Interested in
              <br />
              <em className="italic text-[#a1a1aa]">{brand.name}?</em>
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#fafafa] text-[#09090b] px-8 py-4 text-sm tracking-wider uppercase font-medium hover:bg-[#fffefa] transition-colors duration-200"
            >
              Enquire Now <ArrowUpRight size={16} />
            </Link>
            <Link
              href="/brands"
              className="inline-flex items-center gap-2 border border-[#3f3f46] text-[#a1a1aa] px-8 py-4 text-sm tracking-wider uppercase hover:border-[#a1a1aa] hover:text-[#fafafa] transition-colors duration-200"
            >
              All Brands
            </Link>
          </div>
        </div>
      </section>

      {/* ── NEXT BRAND ── */}
      <section className="px-6 md:px-12 py-16">
        <div className="max-w-[1600px] mx-auto">
          <span className="text-[#3f3f46] text-xs tracking-widest uppercase">Next Brand</span>
          <Link
            href={`/brands/${nextBrand.slug}`}
            className="group mt-4 flex items-center justify-between border-b border-[#27272a] pb-6 hover:border-[#3f3f46] transition-colors duration-300"
          >
            <div>
              <h3
                className="text-[#a1a1aa] text-3xl md:text-5xl font-light group-hover:text-[#fafafa] transition-colors duration-200"
                style={{ fontFamily: "var(--font-cormorant), serif" }}
              >
                {nextBrand.name}
              </h3>
              <p className="text-[#3f3f46] text-xs tracking-wider uppercase mt-1">
                {nextBrand.category}
              </p>
            </div>
            <ArrowUpRight
              size={24}
              className="text-[#3f3f46] group-hover:text-[#fafafa] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-200"
            />
          </Link>
        </div>
      </section>
    </>
  );
}
