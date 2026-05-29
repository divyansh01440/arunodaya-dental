import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Check,
  Smile,
  Sparkles,
  Syringe,
  Puzzle,
  Sun,
  RefreshCw,
  Stethoscope,
  Scan,
  Baby,
  ShieldCheck,
  IndianRupee,
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";

const services = [
  {
    id: "rct",
    icon: Syringe,
    title: "Painless Root Canal Treatment",
    description:
      "Our flagship service. Both our doctors are specialist endodontists. Single-sitting and multi-visit root canals using modern rotary endodontics for virtually painless treatment.",
    price: "₹5,000 (Anterior) – ₹8,000 (Posterior)",
    image: "https://res.cloudinary.com/dwenbr9ny/image/upload/q_auto/f_auto/v1780077663/root_cannel_spgexp.png",
    features: [
      "Single-sitting RCT available",
      "Latest rotary instruments",
      "Digital X-ray included",
      "Specialist endodontists",
      "Post-treatment follow-up",
    ],
  },
  {
    id: "smile-design",
    icon: Smile,
    title: "Smile Design & Veneers",
    description:
      "Comprehensive cosmetic transformation including veneers, laminates, and direct composite veneers. We start with a digital smile preview so you know exactly what to expect.",
    price: "₹5,000 per tooth (Veneer/Laminate)",
    image: "https://res.cloudinary.com/dwenbr9ny/image/upload/q_auto/f_auto/v1780077888/veneers.jpg_k8bmov.jpg",
    features: [
      "Porcelain & composite veneers",
      "Direct composite veneers",
      "Dental laminates",
      "Customised to your face",
      "Long-lasting results",
    ],
  },
  {
    id: "implants",
    icon: Puzzle,
    title: "Dental Implants",
    description:
      "Permanent, natural-looking replacement for missing teeth using premium titanium implants. Includes sinus lift and bone grafting if required.",
    price: "₹25,000 (Single Implant)",
    image: "https://res.cloudinary.com/dwenbr9ny/image/upload/q_auto/f_auto/v1780078335/implant.jpg_jr2vty.jpg",
    features: [
      "Premium titanium implants",
      "Sinus lift: ₹15,000",
      "Bone grafting: ₹5,000/tooth",
      "Single & multiple tooth",
      "Designed to last a lifetime",
    ],
  },
  {
    id: "whitening",
    icon: Sun,
    title: "Teeth Whitening / Bleaching",
    description:
      "Professional in-office bleaching for a noticeably brighter smile in a single visit, plus home bleaching kits for gradual whitening.",
    price: "₹8,000 (Home) / ₹10,000 (In-Office)",
    image: "https://res.cloudinary.com/dwenbr9ny/image/upload/q_auto/f_auto/v1780077082/bleaching.jpg_azu7zy.jpg",
    features: [
      "In-office bleaching",
      "Take-home kits available",
      "Long-lasting results",
      "Sensitivity-aware formulas",
      "Stain removal",
    ],
  },
  {
    id: "crowns",
    icon: Sparkles,
    title: "Crowns & Bridges",
    description:
      "Strong, natural-looking crowns and bridges in zirconia, PFM, or metal. Restore damaged, broken, or missing teeth with precise digital impressions.",
    price: "₹3,000 – ₹10,000 per tooth",
    image: "https://res.cloudinary.com/dwenbr9ny/image/upload/q_auto/f_auto/v1780078500/crown_and_bridges.jpg_ohjce9.jpg",
    features: [
      "Zirconia crown: ₹10,000",
      "PFM crown: ₹7,000",
      "Metal crown: ₹3,000",
      "Multi-unit bridges",
      "Natural shade matching",
    ],
  },
  {
    id: "fillings",
    icon: RefreshCw,
    title: "Dental Restoration / Fillings",
    description:
      "Tooth-coloured composite fillings, GIC, or amalgam — depending on what's best for each tooth. Quick, painless, and aesthetically pleasing.",
    price: "₹1,500 – ₹3,000 per tooth",
    image: "https://res.cloudinary.com/dwenbr9ny/image/upload/q_auto/f_auto/v1780078427/restorations.jpg_sgbeex.jpg",
    features: [
      "Composite (tooth-coloured): ₹3,000",
      "GIC restoration: ₹1,500",
      "Amalgam: ₹1,600",
      "Temporary filling: ₹500",
      "Same-visit completion",
    ],
  },
  {
    id: "braces",
    icon: Stethoscope,
    title: "Braces & Orthodontics",
    description:
      "Complete orthodontic treatment with options ranging from traditional metal braces to clear invisible aligners.",
    price: "₹50,000 – ₹2,50,000",
    image: "https://res.cloudinary.com/dwenbr9ny/image/upload/v1780078593/ortho.jpg_itpfux.jpg",
    features: [
      "Metal braces: ₹50,000",
      "Ceramic braces: ₹75,000",
      "Lingual braces: ₹1,30,000",
      "Invisalign: ₹2,50,000",
      "Retention plate: ₹5,000",
    ],
  },
  {
    id: "kids",
    icon: Baby,
    title: "Pediatric Dentistry",
    description:
      "Gentle, child-friendly dental care including pulpectomy, fluoride treatments, and pit & fissure sealants for kids.",
    price: "₹1,500 – ₹5,000",
    image: "https://res.cloudinary.com/dwenbr9ny/image/upload/v1780078546/pedeatric.jpg_z1oczj.jpg",
    features: [
      "Pulpectomy: ₹5,000",
      "Pit & fissure sealants: ₹1,500",
      "Fluoride application: ₹2,000",
      "Pre-formed metal crowns: ₹3,000",
      "Kid-friendly approach",
    ],
  },
  {
    id: "xray",
    icon: Scan,
    title: "Digital Dental X-Ray",
    description:
      "On-site digital X-ray imaging for instant, accurate diagnosis with significantly reduced radiation exposure.",
    price: "₹500 (IOPA) ",
    image: "https://res.cloudinary.com/dwenbr9ny/image/upload/q_auto/f_auto/v1780078728/xray.jpg_wx3xcr.jpg",
    features: [
      "Instant digital images",
      "Reduced radiation",
      "IOPA: ₹500",
      "Digital records kept",
    ],
  },
  {
    id: "checkup",
    icon: ShieldCheck,
    title: "Consultation & Check-up",
    description:
      "Preventive care is the foundation of oral health. Includes oral examination, scaling, and a personalised treatment plan.",
    price: "₹500 (General) / ₹1,000 (Specialist)",
    image: "/photos/reception.jpg",
    features: [
      "General consultation: ₹500",
      "Specialist consultation: ₹1,000",
      "Oral prophylaxis: ₹6,000",
      "Complete oral assessment",
      "Personalised treatment plan",
    ],
  },
];

const ServicesPage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="relative pt-32 pb-20 bg-gradient-to-br from-primary via-primary-dark to-primary overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                backgroundSize: "40px 40px",
              }}
            />
          </div>
          <div className="container-custom relative z-10">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
                Complete Dental Care Solutions
              </h1>
              <p className="text-white/80 text-lg leading-relaxed mb-6">
                Advanced treatments delivered with care and precision. From painless root canals
                to complex smile transformations, we provide comprehensive dental services for the
                whole family.
              </p>
              <Link
                to="/pricing"
                className="inline-flex items-center gap-2 px-5 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-medium transition-colors border border-white/20"
              >
                View Full Price List
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </section>

        <section className="section-padding bg-background">
          <div className="container-custom">
            <div className="space-y-20">
              {services.map((service, index) => (
                <motion.div
                  key={service.id}
                  id={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="grid lg:grid-cols-2 gap-10 items-center"
                >
                  <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                      <service.icon className="w-7 h-7 text-primary" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-4">
                      {service.title}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {service.description}
                    </p>

                    <div className="flex items-center gap-3 mb-6">
                      <IndianRupee className="w-5 h-5 text-secondary" />
                      <span className="font-heading font-semibold text-lg text-secondary">
                        {service.price}
                      </span>
                    </div>

                    <ul className="grid sm:grid-cols-2 gap-3 mb-8">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm text-foreground/80">
                          <Check className="w-4 h-4 text-accent flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <Link to="/booking" className="btn-cta">
                      Book This Service
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>

                  <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                    <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-lg">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent pointer-events-none" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-primary">
          <div className="container-custom text-center">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-6">
              Not Sure Which Treatment You Need?
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
              Book a consultation with Dr. Prathmesh Rai or Dr. Kalpana Sharma Rai for a
              comprehensive assessment and personalised treatment plan.
            </p>
            <Link
              to="/booking"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary rounded-xl font-semibold hover:bg-white/90 transition-colors shadow-lg"
            >
              Schedule Consultation
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default ServicesPage;
