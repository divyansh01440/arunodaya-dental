import { motion } from "framer-motion";
import { Shield, IndianRupee, Sparkles, UserCheck, Zap, HeartPulse } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Painless Treatment",
    description: "Advanced techniques ensuring comfortable, anxiety-free dental care.",
  },
  {
    icon: IndianRupee,
    title: "Affordable Pricing",
    description: "Premium quality treatments at prices that fit every budget.",
  },
  {
    icon: Sparkles,
    title: "Modern Technology",
    description: "State-of-the-art equipment for precise, effective treatments.",
  },
  {
    icon: UserCheck,
    title: "Experienced Team",
    description: "Two specialist endodontists with 35+ years of combined experience.",
  },
  {
    icon: HeartPulse,
    title: "Clean & Hygienic",
    description: "Strict sterilization protocols for your complete safety.",
  },
  {
    icon: Zap,
    title: "Quick Results",
    description: "Efficient procedures with lasting, beautiful outcomes.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-secondary font-semibold text-sm uppercase tracking-wider"
          >
            Why Choose Us
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-heading font-bold text-foreground mt-3"
          >
            Your Trusted Dental Care Partner
          </motion.h2>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="service-card text-center group"
            >
              <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors duration-300">
                <feature.icon className="w-7 h-7 text-primary group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
