import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Phone, Calendar } from "lucide-react";

const CTASection = () => {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-dark to-primary" />
      
      {/* Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }} />
      </div>

      {/* Decorative Blobs */}
      <motion.div 
        className="absolute top-0 right-[20%] w-64 h-64 bg-secondary/20 rounded-full blur-3xl"
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
      />

      <div className="container-custom relative z-10">
        <div className="text-center max-w-2xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-6"
          >
            Ready for Your{" "}
            <span className="text-secondary">Perfect Smile</span>?
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/80 text-lg mb-10"
          >
            Book your appointment today and experience pain-free dental care
            with Dr. Prathmesh Rai, Dr. Kalpana Sharma Rai and our expert team.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link 
              to="/booking" 
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary rounded-xl font-semibold hover:bg-white/90 transition-colors shadow-lg"
            >
              <Calendar className="w-5 h-5" />
              Book Appointment Now
            </Link>
            <a 
              href="tel:+917974519062" 
              className="btn-outline-hero"
            >
              <Phone className="w-5 h-5" />
              Call: +91 79745 19062
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
