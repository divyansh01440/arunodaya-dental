import { motion } from "framer-motion";
import { MapPin, Phone, Clock, ExternalLink, Mail } from "lucide-react";
import { CLINIC } from "@/lib/clinic";

const LocationSection = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-secondary font-semibold text-sm uppercase tracking-wider">
            Find Us
          </span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mt-3 mb-4">
            Visit Our Clinic in Napier Town
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Conveniently located besides Shastri Bridge in the heart of Jabalpur, with easy access
            and parking nearby.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-stretch">
          {/* Map + exterior photo */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="rounded-3xl overflow-hidden shadow-lg aspect-[4/3]">
              <iframe
                src={CLINIC.mapsEmbed}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Arunodaya Dental Clinic Location"
              />
            </div>
            <div className="rounded-2xl overflow-hidden shadow-md aspect-[16/9]">
              <img
                src="https://res.cloudinary.com/dwenbr9ny/image/upload/q_auto/f_auto/v1780134778/Copilot_20260530_152239_koqz7d.png"
                alt="Arunodaya Dental Clinic exterior in Napier Town, Jabalpur"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center"
          >
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-foreground mb-1">Address</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    #1140, Opposite Commercial Auto,<br />
                    Besides Shastri Bridge, Napier Town,<br />
                    Jabalpur — 482001, Madhya Pradesh
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Landmark: Near Bank of Baroda, Shastri Bridge
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-foreground mb-1">Phone</h3>
                  <a
                    href={`tel:${CLINIC.phoneRaw}`}
                    className="text-primary font-medium hover:underline block"
                  >
                    {CLINIC.phoneDisplay}
                  </a>
                  <a
                    href={`tel:${CLINIC.altPhoneRaw}`}
                    className="text-sm text-muted-foreground hover:text-primary block"
                  >
                    Alt: {CLINIC.altPhone}
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-foreground mb-1">Email</h3>
                  <a
                    href={`mailto:${CLINIC.email}`}
                    className="text-primary font-medium hover:underline break-all"
                  >
                    {CLINIC.email}
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-foreground mb-1">Hours</h3>
                  <div className="text-muted-foreground text-sm space-y-0.5">
                    <p>Mon–Sat: 10:30 AM – 3:30 PM</p>
                    <p>Mon–Sat: 5:30 PM – 8:30 PM</p>
                    <p className="text-destructive">Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 mt-8">
              <a
                href={CLINIC.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary-dark transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Get Directions
              </a>
              <a
                href={`tel:${CLINIC.phoneRaw}`}
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-primary text-primary rounded-xl font-semibold hover:bg-primary hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4" />
                Call Now
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
