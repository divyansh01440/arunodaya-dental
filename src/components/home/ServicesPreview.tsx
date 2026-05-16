import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Smile, Syringe, Puzzle, Sun, Sparkles, ShieldCheck } from "lucide-react";

const services = [
  {
    icon: Syringe,
    title: "Painless Root Canal",
    description: "Single-sitting RCT with modern rotary endodontics — virtually painless.",
    price: "₹5,000 – ₹8,000",
  },
  {
    icon: Smile,
    title: "Smile Design & Veneers",
    description: "Veneers, laminates, and direct composite for a complete smile transformation.",
    price: "₹5,000 per tooth",
  },
  {
    icon: Puzzle,
    title: "Dental Implants",
    description: "Premium titanium implants. Looks and feels natural.",
    price: "₹25,000",
  },
  {
    icon: Sun,
    title: "Teeth Whitening",
    description: "Professional in-office or take-home bleaching for a brighter smile.",
    price: "₹8,000 – ₹10,000",
  },
  {
    icon: Sparkles,
    title: "Crowns & Bridges",
    description: "Zirconia, PFM, or metal crowns to restore damaged teeth.",
    price: "₹3,000 – ₹10,000",
  },
  {
    icon: ShieldCheck,
    title: "Consultation",
    description: "Complete check-up, scaling, and personalised treatment planning.",
    price: "₹500",
  },
];

const ServicesPreview = () => {
  return (
    <section className="section-padding bg-muted/50">
      <div className="container-custom">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="max-w-xl">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-secondary font-semibold text-sm uppercase tracking-wider"
            >
              Our Services
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl font-heading font-bold text-foreground mt-3"
            >
              Comprehensive Dental Care Solutions
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
            >
              View All Services
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="service-card group"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary-light flex items-center justify-center flex-shrink-0">
                  <service.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                    {service.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-secondary">
                      {service.price}
                    </span>
                    <Link
                      to="/services"
                      className="text-primary text-sm font-medium hover:underline"
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesPreview;
