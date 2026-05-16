import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, IndianRupee } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";

interface Row {
  name: string;
  price: string;
}

const sections: { title: string; color: string; rows: Row[] }[] = [
  {
    title: "Consultation",
    color: "bg-blue-50 border-blue-200",
    rows: [
      { name: "Consultation", price: "₹500" },
      { name: "Specialist Consultation", price: "₹1,000" },
      { name: "X-Ray IOPA", price: "₹500" },
      { name: "OPG with Plate", price: "₹1,000" },
    ],
  },
  {
    title: "Endodontic Procedures",
    color: "bg-pink-50 border-pink-200",
    rows: [
      { name: "Root Canal Treatment (Anterior, per tooth)", price: "₹5,000" },
      { name: "Root Canal Treatment (Posterior, per tooth)", price: "₹8,000" },
      { name: "Re-RCT (per tooth)", price: "₹8,000" },
      { name: "Post & Core (per tooth)", price: "₹3,000" },
      { name: "Indirect Pulp Capping (per tooth)", price: "₹4,000" },
      { name: "Indirect Pulp Capping with MTA (per tooth)", price: "₹8,000" },
    ],
  },
  {
    title: "Restorative & Cosmetic Procedures",
    color: "bg-yellow-50 border-yellow-200",
    rows: [
      { name: "Composite Restoration (per tooth)", price: "₹3,000" },
      { name: "GIC Restoration (per tooth)", price: "₹1,500" },
      { name: "Amalgam Restoration (per tooth)", price: "₹1,600" },
      { name: "Laminates & Veneers (per tooth)", price: "₹5,000" },
      { name: "Temporary Filling (per tooth)", price: "₹500" },
      { name: "Direct Composite Veneer (per tooth)", price: "₹5,000" },
      { name: "In-Office Bleaching", price: "₹10,000" },
      { name: "Home Bleaching", price: "₹8,000" },
      { name: "Dental Jewellery (per jewellery)", price: "₹4,000" },
    ],
  },
  {
    title: "Prosthetic Procedures",
    color: "bg-purple-50 border-purple-200",
    rows: [
      { name: "Metal-Free Zirconia Crown (per tooth)", price: "₹10,000" },
      { name: "Porcelain Fused to Metal Crown (per tooth)", price: "₹7,000" },
      { name: "Metal Crown (per tooth)", price: "₹3,000" },
      { name: "Metal Crown with Acrylic Facing (per tooth)", price: "₹3,500" },
      { name: "Removable Full Mouth Complete Denture", price: "₹25,000" },
      { name: "Removable Partial Denture (5000 + 500 per tooth)", price: "₹5,000+" },
      { name: "Crown or Bridge Re-Cementation (per unit)", price: "₹1,000" },
    ],
  },
  {
    title: "Orthodontics (Braces) Procedures",
    color: "bg-green-50 border-green-200",
    rows: [
      { name: "Metal Braces", price: "₹50,000" },
      { name: "Ceramic Braces", price: "₹75,000" },
      { name: "Lingual Braces", price: "₹1,30,000" },
      { name: "Invisalign (Clear & Invisible)", price: "₹2,50,000" },
      { name: "Retention Plate (per arch)", price: "₹5,000" },
    ],
  },
  {
    title: "Oral Surgery Procedures",
    color: "bg-orange-50 border-orange-200",
    rows: [
      { name: "Extraction Under LA (per tooth)", price: "₹1,000" },
      { name: "Complicated Extraction under LA (per tooth)", price: "₹3,000" },
      { name: "Third Molar / Impacted Tooth Extraction (per tooth)", price: "₹10,000" },
      { name: "Apisectomy (per tooth)", price: "₹5,000" },
      { name: "Minor Surgical Procedures under LA", price: "₹10,000" },
      { name: "Alveloplasty (per quadrant)", price: "₹8,000" },
      { name: "Biopsy under LA", price: "₹8,000" },
      { name: "I & D (Extra Oral)", price: "₹6,000" },
      { name: "I & D (Intra Oral)", price: "₹10,000" },
    ],
  },
  {
    title: "Dental Implants",
    color: "bg-cyan-50 border-cyan-200",
    rows: [
      { name: "Single Implant", price: "₹25,000" },
      { name: "Sinus Lift Procedure", price: "₹15,000" },
      { name: "Bone Grafting Procedure (per tooth)", price: "₹5,000" },
    ],
  },
  {
    title: "Periodontics Procedures",
    color: "bg-teal-50 border-teal-200",
    rows: [
      { name: "Oral Prophylaxis (Scaling & Polishing)", price: "₹6,000" },
      { name: "Gingivectomy by Scalpel (per quadrant)", price: "₹5,000" },
      { name: "Gingivectomy by LASER (per quadrant)", price: "₹8,000" },
      { name: "Flap Surgery without Bone Graft (per quadrant)", price: "₹8,000" },
      { name: "Bone Graft (per tooth)", price: "₹3,000" },
      { name: "Operculectomy", price: "₹2,000" },
    ],
  },
  {
    title: "Pedodontic Procedures (For Children)",
    color: "bg-indigo-50 border-indigo-200",
    rows: [
      { name: "Pulpectomy (per tooth)", price: "₹5,000" },
      { name: "Pit & Fissure Sealants (per arch)", price: "₹1,500" },
      { name: "Fluoride Application (per arch)", price: "₹2,000" },
      { name: "Metal Crowns Pre-formed (per tooth)", price: "₹3,000" },
    ],
  },
];

const PricingPage = () => {
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
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-2xl"
            >
              <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
                Transparent Pricing
              </h1>
              <p className="text-white/80 text-lg leading-relaxed">
                Our complete service price guide. Final pricing may vary based on case complexity
                and is confirmed after consultation.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="section-padding bg-background">
          <div className="container-custom">
            <div className="grid md:grid-cols-2 gap-6">
              {sections.map((section, idx) => (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (idx % 4) * 0.05 }}
                  className={`rounded-2xl border-2 overflow-hidden ${section.color}`}
                >
                  <div className="bg-primary text-white px-5 py-3 text-center">
                    <h2 className="font-heading font-semibold text-base">{section.title}</h2>
                  </div>
                  <div className="p-4 space-y-2 bg-white/60">
                    {section.rows.map((row) => (
                      <div
                        key={row.name}
                        className="flex justify-between items-center gap-3 py-2 border-b border-border/40 last:border-0"
                      >
                        <span className="text-sm text-foreground flex-1">{row.name}</span>
                        <span className="text-sm font-semibold text-primary whitespace-nowrap">
                          {row.price}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-12 bg-primary/5 rounded-2xl p-6 text-center max-w-2xl mx-auto">
              <IndianRupee className="w-10 h-10 text-primary mx-auto mb-3" />
              <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                Need a Personalised Quote?
              </h3>
              <p className="text-muted-foreground text-sm mb-5">
                Final pricing depends on case complexity. Book a consultation to get an accurate
                treatment plan.
              </p>
              <Link
                to="/booking"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary-dark transition-colors"
              >
                Book Consultation
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default PricingPage;
