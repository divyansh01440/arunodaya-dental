import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { GraduationCap, Award, ArrowRight, Clock } from "lucide-react";
import { DOCTORS_INFO } from "@/lib/clinic";

const DoctorSection = () => {
  return (
    <section className="section-padding bg-muted/50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <span className="text-secondary font-semibold text-sm uppercase tracking-wider">
            Meet Our Doctors
          </span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mt-3 mb-4">
            Expert Care from Trusted Specialists
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Arunodaya Dental Clinic is led by two highly experienced doctors with deep expertise
            in endodontics, cosmetic dentistry, and modern restorative procedures.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {DOCTORS_INFO.map((doc, idx) => (
            <motion.div
              key={doc.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              className="bg-card rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-shadow flex flex-col"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                <img
                  src={doc.photo}
                  alt={doc.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur rounded-full px-3 py-1 text-xs font-semibold text-primary">
                  {doc.experience}+ years
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="font-heading font-bold text-xl text-foreground mb-1">{doc.name}</h3>
                <p className="text-sm text-muted-foreground mb-1">{doc.qualification}</p>
                <p className="text-sm text-primary font-medium mb-4">{doc.specialization}</p>

                <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
                  {doc.bio}
                </p>

                <div className="space-y-2 text-xs">
                  <div className="flex items-start gap-2 text-muted-foreground">
                    <GraduationCap className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>{doc.qualificationShort} — Endodontics specialist</span>
                  </div>
                  <div
                    className="flex items-start gap-2 text-muted-foreground"
                    dangerouslySetInnerHTML={{
                      __html: `<svg class="w-4 h-4 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><span>${doc.hours}</span>`,
                    }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/about"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
          >
            Learn more about our team
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DoctorSection;
