import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Phone, Star, Shield, Clock, Award } from "lucide-react";
import { CLINIC } from "@/lib/clinic";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-dark to-primary" />

      {/* Pattern Overlay */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Decorative Elements */}
      <motion.div
        className="absolute top-20 right-[10%] w-64 h-64 bg-secondary/20 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-20 left-[5%] w-96 h-96 bg-secondary/10 rounded-full blur-3xl"
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <div className="container-custom relative z-10 py-32 lg:py-40">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium mb-6"
            >
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              {CLINIC.ratings.google} Rating · Trusted Since {CLINIC.established}
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white leading-tight mb-6"
            >
              Experience{" "}
              <span className="text-secondary">Painless</span>{" "}
              Dental Care in Jabalpur
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-white/80 leading-relaxed mb-8 max-w-2xl"
            >
              Premium endodontic & cosmetic dentistry by{" "}
              <strong className="text-white">Dr. Prathmesh Rai</strong> and{" "}
              <strong className="text-white">Dr. Kalpana Sharma Rai</strong> — 35+ years of combined
              experience delivering virtually painless root canals and stunning smile makeovers.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 mb-10"
            >
              <Link to="/booking" className="btn-cta">
                Book Appointment
              </Link>
              <a href={`tel:${CLINIC.phoneRaw}`} className="btn-outline-hero">
                <Phone className="w-5 h-5" />
                Call: {CLINIC.phoneDisplay}
              </a>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap gap-3"
            >
              <div className="trust-badge">
                <Shield className="w-4 h-4 text-accent" />
                Painless Treatment
              </div>
              <div className="trust-badge">
                <Clock className="w-4 h-4 text-accent" />
                Open 6 days a week
              </div>
              <div className="trust-badge">
                <Award className="w-4 h-4 text-accent" />
                IDA-recognised
              </div>
            </motion.div>
          </div>

          {/* Right: Hero photo collage */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            <div className="relative">
              {/* Main photo */}
              <div className="rounded-3xl overflow-hidden shadow-2xl ring-4 ring-white/10 aspect-[4/5]">
                <img
                  src="/photos/hero.jpg"
                  alt="Modern dental treatment room at Arunodaya"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Small accent photo */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="absolute -bottom-6 -left-6 w-40 h-40 rounded-2xl overflow-hidden shadow-2xl ring-4 ring-white/15"
              >
                <img
                  src="/photos/doctors-together.jpg"
                  alt="Dr. Prathmesh Rai and Dr. Kalpana Sharma Rai"
                  className="w-full h-full object-cover"
                />
              </motion.div>
              {/* Stat badge */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 }}
                className="absolute -top-4 -right-4 bg-white rounded-2xl px-5 py-3 shadow-2xl"
              >
                <div className="flex items-center gap-3">
                  <Award className="w-6 h-6 text-accent" />
                  <div>
                    <div className="font-heading font-bold text-2xl text-primary leading-none">
                      35+
                    </div>
                    <div className="text-xs text-muted-foreground">years combined</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path
            d="M0 120V60C240 20 480 0 720 0C960 0 1200 20 1440 60V120H0Z"
            fill="hsl(210 40% 99%)"
          />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
