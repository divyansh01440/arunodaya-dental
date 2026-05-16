// Centralised clinic info — change here once and it propagates everywhere.
export const CLINIC = {
  name: "Arunodaya Dental Clinic",
  tagline: "Dental Care. Healthy Smile. Better Life.",
  shortTagline: "Painless Dentistry · Trusted Care",
  established: 2012,

  // Contact
  phone: "+91 79745 19062",
  phoneRaw: "+917974519062",
  phoneDisplay: "+91 79745 19062",
  altPhone: "+91 98934 14797",
  altPhoneRaw: "+919893414797",
  whatsapp: "+91 79745 19062",
  whatsappRaw: "917974519062",
  email: "arunodayadentalclinic@gmail.com",

  // Address
  address: {
    line1: "#1140, Opposite Commercial Auto",
    line2: "Besides Shastri Bridge, Napier Town",
    city: "Jabalpur",
    state: "Madhya Pradesh",
    pincode: "482001",
    landmark: "Near Bank of Baroda, Shastri Bridge",
    full:
      "#1140, Opposite Commercial Auto, Besides Shastri Bridge, Napier Town, Jabalpur — 482001, Madhya Pradesh",
  },

  // Coordinates / maps
  coords: { lat: 23.15909724036924, lng: 79.92969252169132 },
  mapsUrl: "https://maps.google.com/?q=23.15909724036924,79.92969252169132",
  mapsEmbed:
    "https://www.google.com/maps?q=23.15909724036924,79.92969252169132&z=17&output=embed",

  // Hours
  hours: {
    weekdayMorning: { open: "10:30 AM", close: "3:30 PM" },
    weekdayEvening: { open: "5:30 PM", close: "8:30 PM" },
    sunday: "Closed",
  },

  // Reviews
  ratings: {
    google: 4.8,
    googleReviews: 53, // realistic; Justdial+Practo combined
    practoRating: 4.8,
    justdialRating: 4.3,
  },

  // Stats
  stats: {
    yearsCombinedExperience: 35,
    patientsTreated: "3,000+",
    yearsServing: new Date().getFullYear() - 2012,
  },
};

export const DOCTORS_INFO = [
  {
    slug: "prathmesh-rai",
    name: "Dr. Prathmesh Rai",
    qualification: "BDS, MDS — Conservative Dentistry & Endodontics (Indore)",
    qualificationShort: "BDS, MDS",
    specialization: "Endodontist · Cosmetic Dentist",
    experience: 17,
    consultationFee: 200,
    photo: "/photos/doctor-prathmesh.jpg",
    bio:
      "Founder of Arunodaya Dental Clinic with 17 years of clinical experience. A specialist endodontist, " +
      "Dr. Prathmesh Rai is best known for delivering virtually painless root canal treatments and beautiful " +
      "cosmetic smile transformations. He has been recognised by the Indian Dental Association (IDA) for his " +
      "lectures and contributions to dental education.",
    hours: "Mon–Sat · 10:30 AM – 3:30 PM &nbsp;&amp;&nbsp; 5:30 PM – 8:30 PM",
  },
  {
    slug: "kalpana-sharma-rai",
    name: "Dr. Kalpana Sharma Rai",
    qualification: "BDS, MDS — Conservative Dentistry & Endodontics (Karnataka)",
    qualificationShort: "BDS, MDS",
    specialization: "Endodontist · Cosmetic & Aesthetic Dentist · Dental Surgeon",
    experience: 18,
    consultationFee: 200,
    photo: "/photos/doctor-kalpana.jpg",
    bio:
      "An IDA-member endodontist with 18 years of expertise, Dr. Kalpana Sharma Rai previously served on " +
      "the faculty of Modern Dental College, Indore (2008–11). Specialising in conservative dentistry, " +
      "endodontics, and aesthetic procedures, she is known for her gentle, patient-first approach.",
    hours: "Mon–Sat · 10:30 AM – 3:30 PM (Morning only)",
  },
];

export const SERVICES = [
  {
    id: "rct",
    name: "Painless Root Canal Treatment",
    short: "RCT",
    description:
      "Single-sitting and multi-visit root canals using modern rotary endodontics for virtually painless treatment.",
    priceRange: "₹3,000 – ₹8,000",
  },
  {
    id: "smile-design",
    name: "Smile Design",
    short: "Smile Makeover",
    description:
      "Comprehensive cosmetic transformation including veneers, contouring, and contact lenses for that perfect smile.",
    priceRange: "₹2,000 – ₹15,000",
  },
  {
    id: "implants",
    name: "Dental Implants",
    short: "Implants",
    description:
      "Permanent, natural-looking replacement for missing teeth with titanium implants and ceramic crowns.",
    priceRange: "₹25,000 – ₹40,000",
  },
  {
    id: "whitening",
    name: "Teeth Whitening / Bleaching",
    short: "Whitening",
    description:
      "Professional bleaching for a brighter, whiter smile in a single visit.",
    priceRange: "₹2,000 – ₹5,000",
  },
  {
    id: "crowns",
    name: "Ceramic Crowns & Bridges",
    short: "Crown & Bridge",
    description:
      "Strong, natural-looking ceramic crowns and bridges to restore damaged or missing teeth.",
    priceRange: "₹4,000 – ₹12,000",
  },
  {
    id: "braces",
    name: "Braces & Orthodontics",
    short: "Braces",
    description:
      "Metal and ceramic braces to straighten teeth and correct bite alignment.",
    priceRange: "₹15,000 – ₹25,000",
  },
  {
    id: "fillings",
    name: "Dental Restoration / Fillings",
    short: "Fillings",
    description:
      "Tooth-coloured composite fillings that blend seamlessly with your natural teeth.",
    priceRange: "₹500 – ₹2,000",
  },
  {
    id: "dentures",
    name: "Dentures",
    short: "Dentures",
    description:
      "Comfortable acrylic partial and complete dentures, custom-fitted for everyday wear.",
    priceRange: "₹5,000 – ₹20,000",
  },
  {
    id: "kids",
    name: "Pediatric Dentistry",
    short: "Kids Dentistry",
    description:
      "Gentle, child-friendly dental care including check-ups, fluoride treatments, and minor procedures.",
    priceRange: "₹500 – ₹3,000",
  },
  {
    id: "xray",
    name: "Digital Dental X-Ray",
    short: "X-Ray",
    description:
      "On-site digital X-ray imaging for instant, accurate diagnosis with reduced radiation.",
    priceRange: "₹200 – ₹500",
  },
];

export const SOCIAL = {
  facebook: "https://www.facebook.com/",
  instagram: "https://www.instagram.com/",
  practo: "https://www.practo.com/jabalpur/clinic/arunodaya-dental-clinic-napier-town-1",
  justdial: "https://www.justdial.com/",
  mappls: "https://mappls.com/m2eyot",
};
