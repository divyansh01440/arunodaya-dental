import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock, Facebook, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-white">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-white/10 overflow-hidden flex items-center justify-center ring-1 ring-white/15">
                <img
                  src="/logo-icon.png"
                  alt="Arunodaya Dental Clinic"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-heading font-bold text-xl">Arunodaya Dental Clinic</h3>
                <p className="text-xs text-white/60">Dental Care. Healthy Smile. Better Life.</p>
              </div>
            </div>
            <p className="text-white/70 text-sm leading-relaxed">
              Experience premium dental care at Arunodaya Dental Clinic — committed to
              painless, modern, and affordable treatments for the whole family.
            </p>
            <div className="flex gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { href: "/", label: "Home" },
                { href: "/services", label: "Our Services" },
                { href: "/about", label: "About Us" },
                { href: "/testimonials", label: "Reviews" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-white/70 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-4">Services</h4>
            <ul className="space-y-3">
              {[
                "Painless Root Canal",
                "Smile Design",
                "Dental Implants",
                "Teeth Whitening",
                "Crowns & Bridges",
                "Digital X-Ray",
              ].map((service) => (
                <li key={service}>
                  <Link
                    to="/services"
                    className="text-white/70 hover:text-white text-sm transition-colors"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <MapPin className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                <span className="text-white/70 text-sm leading-relaxed">
                  #1140, Opposite Commercial Auto, Besides Shastri Bridge, Napier Town, Jabalpur — 482001, MP
                </span>
              </li>
              <li>
                <a
                  href="tel:+917974519062"
                  className="flex items-center gap-3 text-white/70 hover:text-white text-sm transition-colors"
                >
                  <Phone className="w-5 h-5 text-secondary flex-shrink-0" />
                  +91 79745 19062
                </a>
              </li>
              <li>
                <a
                  href="mailto:arunodayadentalclinic@gmail.com"
                  className="flex items-center gap-3 text-white/70 hover:text-white text-sm transition-colors break-all"
                >
                  <Mail className="w-5 h-5 text-secondary flex-shrink-0" />
                  arunodayadentalclinic@gmail.com
                </a>
              </li>
              <li className="flex gap-3">
                <Clock className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                <div className="text-white/70 text-sm">
                  <p>Mon–Sat: 10:30 AM – 3:30 PM</p>
                  <p>Mon–Sat: 5:30 PM – 8:30 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/50 text-sm">
            © {new Date().getFullYear()} Arunodaya Dental Clinic. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-white/50 hover:text-white/80 text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-white/50 hover:text-white/80 text-sm transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
