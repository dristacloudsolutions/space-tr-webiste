export interface Brand {
  slug: string;
  number: string;
  name: string;
  category: string;
  origin: string;
  description: string;
  story: string;
  markets: string[];
  highlights: string[];
}

export const brands: Brand[] = [
  {
    slug: "ajmal",
    number: "01",
    name: "Ajmal Perfumes",
    category: "Luxury Oriental Fragrance",
    origin: "UAE / India",
    description:
      "One of the most celebrated names in Arabian perfumery, Ajmal has crafted timeless oud and oriental fragrances for over 70 years.",
    story:
      "Founded in 1951 by Haji Ajmal Ali in Assam, India, Ajmal Perfumes has grown into one of the most iconic fragrance houses in the Middle East and South Asia. Their mastery of oud, musk, and exotic botanicals has earned them a loyal following across generations.",
    markets: ["India", "Pakistan", "Bangladesh", "Sri Lanka", "South Africa", "Nigeria", "Kenya"],
    highlights: [
      "70+ years of perfumery heritage",
      "500+ fragrance SKUs across all price points",
      "Strong recognition across South Asian diaspora markets",
      "Oud and oriental speciality range",
    ],
  },
  {
    slug: "rasasi",
    number: "02",
    name: "Rasasi",
    category: "Premium Arabian Perfumery",
    origin: "UAE",
    description:
      "Dubai-born Rasasi blends Eastern tradition with modern sophistication, producing fragrances that resonate deeply across the Gulf, Africa, and the Subcontinent.",
    story:
      "Established in Dubai in 1979, Rasasi has built its reputation on producing rich, long-lasting oriental and floral fragrances at accessible luxury price points. Their collections appeal to a broad demographic while maintaining consistent quality.",
    markets: ["India", "Pakistan", "Ghana", "Nigeria", "South Africa", "Kenya"],
    highlights: [
      "45+ years of Dubai heritage",
      "Award-winning oriental collections",
      "Broad appeal across African and South Asian markets",
      "Strong retail and gifting presence",
    ],
  },
  {
    slug: "al-haramain",
    number: "03",
    name: "Al Haramain",
    category: "Luxury Arabian Oud & Attar",
    origin: "Saudi Arabia",
    description:
      "A benchmark of Saudi Arabian perfumery, Al Haramain is synonymous with premium oud, bakhoor, and attars treasured across the Muslim world.",
    story:
      "Founded in Mecca in 1970, Al Haramain Perfumes draws its inspiration from the holy cities of the Arabian Peninsula. Their bakhoor incense and pure oud collections carry deep cultural significance and are prized gifts across the Muslim world.",
    markets: ["India", "Pakistan", "Bangladesh", "Nigeria", "South Africa", "Ghana", "Kenya"],
    highlights: [
      "50+ year legacy from the heart of Arabia",
      "Pure oud and bakhoor collections",
      "Premium gifting and religious occasion range",
      "Iconic status across Muslim-majority markets",
    ],
  },
  {
    slug: "lattafa",
    number: "04",
    name: "Lattafa Perfumes",
    category: "Contemporary Arabic Fragrance",
    origin: "UAE",
    description:
      "Lattafa has rapidly become one of the fastest-growing fragrance houses, delivering bold, modern interpretations of Middle Eastern perfumery at accessible prices.",
    story:
      "Founded in Dubai in 2002, Lattafa Perfumes has disrupted the fragrance market by producing luxury-quality oriental fragrances at highly competitive price points. Their innovative approach and consistent launches have built a massive following among younger consumers globally.",
    markets: ["India", "Pakistan", "Sri Lanka", "South Africa", "Nigeria", "Kenya", "Ghana"],
    highlights: [
      "Fastest-growing Arabic fragrance brand globally",
      "Viral appeal on social media markets",
      "100+ annual fragrance launches",
      "Luxury quality at accessible price points",
    ],
  },
  {
    slug: "fragrance-world",
    number: "05",
    name: "Fragrance World",
    category: "Luxury & Niche Fragrance",
    origin: "UAE",
    description:
      "Fragrance World produces high-quality inspirations and original creations, bridging the gap between mainstream appeal and niche sophistication.",
    story:
      "Based in Sharjah, UAE, Fragrance World has become a significant player in the accessible luxury fragrance space. Known for their quality inspirations of designer and niche fragrances, they make aspirational scents accessible to a broad global audience.",
    markets: ["India", "Pakistan", "Bangladesh", "South Africa", "Nigeria"],
    highlights: [
      "Extensive catalogue of original and inspiration fragrances",
      "Strong value proposition for mass-market distribution",
      "Growing niche and artisanal range",
      "UAE manufacturing with global quality standards",
    ],
  },
  {
    slug: "khadlaj",
    number: "06",
    name: "Khadlaj Perfumes",
    category: "Heritage Arabian Perfumery",
    origin: "UAE",
    description:
      "Khadlaj's richly layered oriental compositions celebrate the finest ingredients from the Arabian Peninsula — oud, rose, amber, and beyond.",
    story:
      "Khadlaj Perfumes is a Dubai-based house known for producing deeply layered oriental fragrances using the finest raw materials. Their commitment to traditional perfumery methods, combined with elegant modern packaging, makes them a premium choice across gift and retail channels.",
    markets: ["India", "Pakistan", "Nigeria", "South Africa", "Ghana", "Kenya"],
    highlights: [
      "Premium raw materials sourced globally",
      "Elegant packaging suited for gifting",
      "Strong in oud-based and oriental categories",
      "Growing international footprint",
    ],
  },
];

export function getBrandBySlug(slug: string): Brand | undefined {
  return brands.find((b) => b.slug === slug);
}

export const brandLogos = [
  { name: "Parfum de Marly",        img: "https://static.wixstatic.com/media/06b064_c3baaee2b0fa41b7a7fb01554655fb91~mv2.jpg/v1/fill/w_268,h_268,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/parfum-de-marly.jpg" },
  { name: "Initio",                  img: "https://static.wixstatic.com/media/06b064_3a068ae814474e60983a429370d0aae1~mv2.jpg/v1/fill/w_268,h_268,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/initio.jpg" },
  { name: "Brand",                   img: "https://static.wixstatic.com/media/8ab953_d5ac896df1994dd3b67b6cf4a91255ee~mv2.jpg/v1/fill/w_268,h_268,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/space%20brands-15.jpg" },
  { name: "Brand",                   img: "https://static.wixstatic.com/media/8ab953_00754ff031c442f0a27849a4a557ca3c~mv2.jpg/v1/fill/w_268,h_268,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/space%20brands-19.jpg" },
  { name: "Brand",                   img: "https://static.wixstatic.com/media/8ab953_54850a6f6caa4a969ccd6d8bedb72090~mv2.jpg/v1/fill/w_268,h_268,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/space%20brands-12.jpg" },
  { name: "Casa Morati",             img: "https://static.wixstatic.com/media/8ab953_b9bbc105941f4f1f9ddac580ee7884d1~mv2.jpg/v1/fill/w_268,h_268,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/casamorati-03.jpg" },
  { name: "Brand",                   img: "https://static.wixstatic.com/media/8ab953_9f7815c1b1d64caa8a3fd6f080db0459~mv2.jpg/v1/fill/w_268,h_268,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/space%20brands-27.jpg" },
  { name: "Brand",                   img: "https://static.wixstatic.com/media/8ab953_d820a5420bae46e1985e6953f6188558~mv2.jpg/v1/fill/w_268,h_268,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/space%20brands-10.jpg" },
  { name: "Brand",                   img: "https://static.wixstatic.com/media/8ab953_900252e80fcc40ec899e0060bbebb410~mv2.jpg/v1/fill/w_268,h_268,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/space%20logo%20brand-34.jpg" },
  { name: "Brand",                   img: "https://static.wixstatic.com/media/8ab953_e541688bc2374f1b964533b58028bfa5~mv2.jpg/v1/fill/w_268,h_268,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/space%20brands-05.jpg" },
  { name: "Brand",                   img: "https://static.wixstatic.com/media/8ab953_be0da131d35f4abf8c39b32a56c69033~mv2.jpg/v1/fill/w_268,h_268,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/space%20brands-06.jpg" },
  { name: "Valentino",               img: "https://static.wixstatic.com/media/8ab953_5cb60910eefd44a0be743d31560034c1~mv2.jpg/v1/fill/w_268,h_268,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/valentino-brand-logo-name-white-symbol-clothes-design-icon-abstract-illustration-with-blac.jpg" },
  { name: "Brand",                   img: "https://static.wixstatic.com/media/8ab953_c4aba568f3d0425d83aa5371c4ed57db~mv2.jpg/v1/fill/w_268,h_268,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/space%20logo%20brand-28.jpg" },
  { name: "Brand",                   img: "https://static.wixstatic.com/media/8ab953_1d672e4affcd457493e48e3f70f6051f~mv2.jpg/v1/fill/w_268,h_268,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/space%20logo%20brand-37.jpg" },
  { name: "Brand",                   img: "https://static.wixstatic.com/media/8ab953_48ae83feca2e40d18edc357cc2ed57b5~mv2.jpg/v1/fill/w_272,h_272,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/space%20logo%20brand-30.jpg" },
  { name: "Brand",                   img: "https://static.wixstatic.com/media/8ab953_867d2402dc9b4bd7ba9a68baa5d25d0d~mv2.jpg/v1/fill/w_272,h_272,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/space%20brands-07.jpg" },
  { name: "Brand",                   img: "https://static.wixstatic.com/media/8ab953_1c1ee4fe44834ac69bfbc38be9de4661~mv2.jpg/v1/fill/w_272,h_272,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/space%20logo%20brand-35.jpg" },
  { name: "Viktor & Rolf",           img: "https://static.wixstatic.com/media/8ab953_436882124c0b49aca83b16c4563e7295~mv2.jpg/v1/fill/w_272,h_272,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/viktor-04.jpg" },
  { name: "Brand",                   img: "https://static.wixstatic.com/media/8ab953_ffafae76e5344b8db272bb5c1050a6fc~mv2.jpg/v1/fill/w_272,h_272,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/space%20logo%20brand-31.jpg" },
  { name: "Brand",                   img: "https://static.wixstatic.com/media/8ab953_bccb4b86279a47149ba9c8c94ab19708~mv2.jpg/v1/fill/w_272,h_272,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/space%20brands-26.jpg" },
  { name: "Afnan",                   img: "https://static.wixstatic.com/media/8ab953_b8e731a29cab4ebd99f9f3f7c0ea3c34~mv2.webp/v1/fill/w_272,h_270,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Logo-Afnan-Editado-300x300_png.webp" },
  { name: "Bond No. 9",              img: "https://static.wixstatic.com/media/06b064_6b0c7c23aa7c45c7bcb36d597578def1~mv2.jpg/v1/fill/w_272,h_272,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/grid-bondno9-logo1701155671.jpg" },
  { name: "Merchant of Venice",      img: "https://static.wixstatic.com/media/06b064_a95828582576420aa272c17b48251fe4~mv2.png/v1/fill/w_272,h_272,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/grid-13merchantvenice1695129021.png" },
  { name: "Franck Boclet",           img: "https://static.wixstatic.com/media/06b064_bc685bf39b854b98bf1384ea89a9e539~mv2.png/v1/fill/w_272,h_272,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/grid-8franck1695129014.png" },
  { name: "Jacques",                 img: "https://static.wixstatic.com/media/06b064_763cb190b030422ab3847001b4d1ba82~mv2.png/v1/fill/w_272,h_272,al_c,lg_1,q_85,enc_avif,quality_auto/grid-7jacques1695129013.png" },
  { name: "Affinessence",            img: "https://static.wixstatic.com/media/06b064_36aa2c526cc54fd481c11eb63c03ea32~mv2.png/v1/fill/w_272,h_272,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/grid-2affinessence1695129006.png" },
  { name: "Chabaud",                 img: "https://static.wixstatic.com/media/06b064_0a6138262ac244108dd180d8069eb414~mv2.jpg/v1/fill/w_272,h_272,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/chabaud.jpg" },
  { name: "Amouroud",                img: "https://static.wixstatic.com/media/06b064_6a78d84cece146beb0bb8f2dae48fad6~mv2.jpg/v1/fill/w_272,h_270,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/amouroud.jpg" },
  { name: "Brand",                   img: "https://static.wixstatic.com/media/8ab953_b856d911aec942ad9d03ca56ec4e2a34~mv2.jpg/v1/fill/w_272,h_272,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/space%20brands-09.jpg" },
  { name: "Diesel",                  img: "https://static.wixstatic.com/media/8ab953_916b89ae81314f3eb29063e244901a1c~mv2.jpg/v1/fill/w_272,h_272,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/diesel-05.jpg" },
  { name: "Brand",                   img: "https://static.wixstatic.com/media/8ab953_94970ad501154e7791bf0aaf2d9b46dc~mv2.jpg/v1/fill/w_272,h_272,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/logo-01-01.jpg" },
  { name: "Brand",                   img: "https://static.wixstatic.com/media/8ab953_a5556f138bc846e7ac3c9d81a359cc66~mv2.jpg/v1/fill/w_272,h_272,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/space%20brands-04.jpg" },
  { name: "Brand",                   img: "https://static.wixstatic.com/media/8ab953_c5016d12fd4e4d1aa127cc11c459099e~mv2.jpg/v1/fill/w_272,h_272,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/space%20brands-11.jpg" },
  { name: "Roja Parfums",            img: "https://static.wixstatic.com/media/06b064_ab38c81a4ba04fdc81d22bbba56a41ba~mv2.jpg/v1/fill/w_272,h_272,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/roja.jpg" },
  { name: "Ormonde Jayne",           img: "https://static.wixstatic.com/media/06b064_5b238b3ae0b54602b79252165c739cb9~mv2.jpg/v1/fill/w_272,h_270,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/ormonde.jpg" },
  { name: "Ramon Bejar",             img: "https://static.wixstatic.com/media/06b064_b2972ccb9a654afe912ef5c18a309605~mv2.jpg/v1/fill/w_272,h_272,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/RAMON-BEJAR.jpg" },
  { name: "Montale",                 img: "https://static.wixstatic.com/media/8ab953_b653c64bf11d4cb597bc0d36974283a2~mv2.jpg/v1/fill/w_272,h_272,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/montale-02.jpg" },
  { name: "Brand",                   img: "https://static.wixstatic.com/media/8ab953_4d7037752c5245c88f8aa0697e72c189~mv2.jpg/v1/fill/w_272,h_272,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/o_1134.jpg" },
  { name: "G&B",                     img: "https://static.wixstatic.com/media/06b064_802d9c0533584093914e43a8e55c1af7~mv2.png/v1/fill/w_272,h_272,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/G%26B.png" },
  { name: "ADO",                     img: "https://static.wixstatic.com/media/06b064_ed1f681900bd40de8dde2f2dc94dd245~mv2.png/v1/fill/w_272,h_272,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/ADO.png" },
];
