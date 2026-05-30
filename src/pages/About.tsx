import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Award, GraduationCap, Users, Heart, Target, Eye, Shield, Clock, Sparkles, ArrowRight } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";

const AboutPage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero */}
        <section className="relative pt-32 pb-20 bg-gradient-to-br from-primary via-primary-dark to-primary overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
              backgroundSize: '40px 40px'
            }} />
          </div>
          <div className="container-custom relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-2xl"
            >
              <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
                About Arunodaya Dental Clinic
              </h1>
              <p className="text-white/80 text-lg leading-relaxed">
                Your trusted partner for comprehensive dental care in Jabalpur. We believe 
                everyone deserves a healthy, beautiful smile.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Our Story */}
        <section className="section-padding bg-background">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <span className="text-secondary font-semibold text-sm uppercase tracking-wider">
                  Our Story
                </span>
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mt-3 mb-6">
                  A Vision for Better Dental Care
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Arunodaya Dental Clinic was founded in 2012 on a simple belief: everyone deserves
                  world-class dental care without the pain or the premium prices. What started as a
                  vision to transform dental experiences in Jabalpur has grown into a trusted
                  healthcare destination for thousands of families across Madhya Pradesh.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Under the expert leadership of Dr. Prathmesh Rai and Dr. Kalpana Sharma Rai —
                  two specialist endodontists with 35+ years of combined experience — we've built
                  a clinic that combines advanced technology with compassionate, patient-first care.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Conveniently located in Napier Town besides Shastri Bridge, Arunodaya Dental
                  Clinic offers comprehensive services from painless root canals to complex smile
                  transformations — all delivered with the same commitment to excellence and
                  patient comfort that has defined us since 2012.
                </p>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="grid grid-cols-2 gap-6"
              >
                {[
                  { number: "12+", label: "Years of Excellence", icon: Award },
                  { number: "3,000+", label: "Happy Patients", icon: Users },
                  { number: "4.8", label: "Google Rating", icon: Sparkles },
                  { number: "35+", label: "Years Combined Exp.", icon: Heart },
                ].map((stat) => (
                  <div key={stat.label} className="card-elevated p-6 text-center">
                    <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center">
                      <stat.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="font-heading font-bold text-3xl text-foreground mb-1">
                      {stat.number}
                    </div>
                    <div className="text-muted-foreground text-sm">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="section-padding bg-muted/50">
          <div className="container-custom">
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="card-elevated p-8"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                  <Target className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-2xl font-heading font-bold text-foreground mb-4">Our Mission</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To provide exceptional dental care that is accessible, affordable, and 
                  anxiety-free for every patient. We strive to educate our community about 
                  oral health while delivering treatments that exceed expectations.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="card-elevated p-8"
              >
                <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center mb-6">
                  <Eye className="w-7 h-7 text-secondary" />
                </div>
                <h3 className="text-2xl font-heading font-bold text-foreground mb-4">Our Vision</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To be the most trusted dental care provider in Central India, known for 
                  our commitment to patient comfort, clinical excellence, and transformative 
                  smile makeovers that change lives.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Doctors */}
        <section className="section-padding bg-background">
          <div className="container-custom">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-secondary font-semibold text-sm uppercase tracking-wider">
                Meet The Experts
              </span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mt-3 mb-4">
                Our Doctors
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Our husband-wife duo of specialist endodontists brings 35+ years of combined
                experience and unwavering dedication to your dental health.
              </p>
            </div>

            <div className="space-y-16">
              {/* Dr. Prathmesh Rai */}
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div className="rounded-3xl overflow-hidden aspect-[3/4] shadow-lg">
                    <img
                      src="/photos/doctor-prathmesh-desk.jpg"
                      alt="Dr. Prathmesh Rai"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl p-4 shadow-lg">
                    <div className="flex items-center gap-2">
                      <Award className="w-5 h-5 text-accent" />
                      <div>
                        <div className="font-heading font-bold text-foreground">Sir</div>
                        <div className="text-xs text-muted-foreground"></div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-2">
                    Dr. Prathmesh Rai
                  </h3>
                  <p className="text-primary font-semibold mb-1">
                    BDS, MDS — Conservative Dentistry &amp; Endodontics
                  </p>
                  <p className="text-sm text-muted-foreground mb-6">
                    Endodontist · Cosmetic &amp; Aesthetic Dentist
                  </p>

                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Founder of Arunodaya Dental Clinic with 17 years of clinical experience.
                    A specialist endodontist, Dr. Prathmesh Rai is best known for delivering
                    virtually painless root canal treatments and beautiful cosmetic smile
                    transformations.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    He has been recognised by the Indian Dental Association (IDA) for his
                    lectures and contributions to dental education, and is passionate about
                    bringing the latest technology to his patients in Jabalpur.
                  </p>

                  <div className="flex flex-wrap gap-3">
                    <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-sm font-medium text-primary">
                      <GraduationCap className="w-4 h-4" />
                      MDS — Indore
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-secondary/10 rounded-full text-sm font-medium text-secondary">
                      <Award className="w-4 h-4" />
                      17 Years Experience
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Dr. Kalpana Sharma Rai */}
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="lg:order-2 relative"
                >
                  <div className="rounded-3xl overflow-hidden aspect-[3/4] shadow-lg">
                    <img
                      src="https://res.cloudinary.com/dwenbr9ny/image/upload/q_auto/f_auto/v1780084363/IMG_3712_doulqy.heic"
                      alt="Dr. Kalpana Sharma Rai"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-4 shadow-lg">
                    <div className="flex items-center gap-2">
                      <Heart className="w-5 h-5 text-accent" />
                      <div>
                        <div className="font-heading font-bold text-foreground">Mam</div>
                        <div className="text-xs text-muted-foreground"></div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="lg:order-1"
                >
                  <h3 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-2">
                    Dr. Kalpana Sharma Rai
                  </h3>
                  <p className="text-primary font-semibold mb-1">
                    BDS, MDS — Conservative Dentistry &amp; Endodontics
                  </p>
                  <p className="text-sm text-muted-foreground mb-6">
                    Endodontist · Cosmetic Dentist · Dental Surgeon
                  </p>

                  <p className="text-muted-foreground leading-relaxed mb-4">
                    With 18 years of expertise, Dr. Kalpana Sharma Rai brings academic rigour
                    and a gentle, patient-first approach to every consultation. She previously
                    served on the faculty of Modern Dental College, Indore (2008–11).
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    A member of the Indian Dental Association, she specialises in conservative
                    dentistry, endodontics, and aesthetic procedures, and is particularly
                    sought after for her work with anxious patients and children.
                  </p>

                  <div className="flex flex-wrap gap-3">
                    <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-sm font-medium text-primary">
                      <GraduationCap className="w-4 h-4" />
                      MDS — Karnataka
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-secondary/10 rounded-full text-sm font-medium text-secondary">
                      <Award className="w-4 h-4" />
                      18 Years Experience
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full text-sm font-medium text-accent">
                      <Clock className="w-4 h-4" />
                      Morning sessions only
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="section-padding bg-muted/50">
          <div className="container-custom">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-secondary font-semibold text-sm uppercase tracking-wider">
                What Guides Us
              </span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mt-3">
                Our Core Values
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Heart, title: "Patient First", description: "Your comfort and satisfaction are our top priorities." },
                { icon: Shield, title: "Safety & Hygiene", description: "Strict protocols to ensure your complete safety." },
                { icon: Sparkles, title: "Excellence", description: "Committed to delivering the highest quality care." },
                { icon: Clock, title: "Accessibility", description: "Affordable treatments without compromising quality." },
              ].map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-card shadow-sm flex items-center justify-center">
                    <value.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-heading font-semibold text-foreground mb-2">{value.title}</h3>
                  <p className="text-muted-foreground text-sm">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-primary">
          <div className="container-custom text-center">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-6">
              Experience the Arunodaya Difference
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
              Join over 1,000 satisfied patients who trust us with their smiles.
            </p>
            <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary rounded-xl font-semibold hover:bg-white/90 transition-colors shadow-lg">
              Book Your Visit
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

export default AboutPage;
