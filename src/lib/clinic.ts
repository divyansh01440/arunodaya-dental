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
    consultationFee: 500,
    photo: "https://res.cloudinary.com/dwenbr9ny/image/upload/q_auto/f_auto/v1780134027/416c78df-b4d3-4881-8a26-df1831564553_yvq45z.png",
    bio:
      "Dr. Prathmesh Rai — A passionate dental surgeon with 17+ years of clinical experience. " +
      "Specializing in Root Canal Science and advanced restorative care. " +
      "His mission is to combine cutting-edge clinical expertise with a gentle, personalized touch. " +
      "At Arunodaya Dental Clinic, we understand that a visit to the dentist can feel daunting."+
      "That’s why we’ve designed our practice to be a warm, stress-free space for patients of all ages."+
      "From precise, durable treatments to routine family wellness, we are here to help."+
      "Our goal is to help you achieve a healthy, confident smile that lasts a lifetime.",
    hours: "Mon–Sat · 10:30 AM – 3:30 PM &nbsp;&amp;&nbsp; 5:30 PM – 8:30 PM",
  },
  {
    slug: "kalpana-sharma-rai",
    name: "Dr. Kalpana Sharma Rai",
    qualification: "BDS, MDS — Conservative Dentistry & Endodontics (Karnataka)",
    qualificationShort: "BDS, MDS",
    specialization: "Endodontist · Cosmetic & Aesthetic Dentist · Dental Surgeon",
    experience: 18,
    consultationFee: 500,
    photo: "https://res.cloudinary.com/dwenbr9ny/image/upload/q_auto/f_auto/v1780133985/e7ec802a-c9df-4f4c-beb7-3d5506a03da7_hjgkxk.png",
    bio:
      "Dr. Kalpana Sharma — A distinguished dentist with 18 years of clinical experience." +
      "Dedicated to providing exceptional oral healthcare and advanced restorative treatments. " +
      "Combining decades of hands-on expertise with a deep understanding of modern dental material science."+
      "She delivers precise, patient-centered care built on trust, clinical excellence, and long-term results"+
      "An accomplished family dentist providing multi-generational oral healthcare."+
      "Dedicated to promoting long-term oral wellness through personalized education."+
      "She creates a warm, comforting clinical environment for every patient.",
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
  justdial: "https://www.justdial.com/Jabalpur/Arunodaya-Dental-Clinic-Near-Bank-Of-Baroda-Napier-Town-Jabalpur/9999PX761-X761-140628150753-S8D7_BZDET",
  mappls: "https://mappls.com/m2eyot",
};
