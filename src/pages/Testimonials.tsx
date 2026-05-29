import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Star, Quote, ArrowRight, ExternalLink } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";

const testimonials = [
  {
    name: "Priya Sharma",
    rating: 5,
    text: "The treatment here is painless and professional, absolutely recommended! Dr. Prathmesh is incredibly gentle and explains everything clearly. I was so nervous about my root canal but he made it completely comfortable.",
    treatment: "Root Canal Treatment",
    date: "2 months ago",
  },
  {
    name: "Rahul Mehta",
    rating: 5,
    text: "Best dental clinic for root canal treatment! Clean clinic, skilled dentist, and great post-treatment care. The staff is friendly and the waiting area is comfortable. Highly satisfied with the results.",
    treatment: "Smile Design",
    date: "1 month ago",
  },
  {
    name: "Anjali Kushwaha",
    rating: 5,
    text: "Dr. Kalpana Sharma is incredibly patient and gentle. She took the time to explain my smile design options and the result is exactly what I hoped for. The clinic is also so clean and welcoming.",
    treatment: "Smile Design",
    date: "3 weeks ago",
  },
  {
    name: "Vikram Singh",
    rating: 5,
    text: "Excellent experience at Arunodaya Dental Clinic. Dr. Prathmesh Rai is very knowledgeable and uses the latest technology. My teeth whitening results were amazing - exactly what I wanted!",
    treatment: "Teeth Whitening",
    date: "1 month ago",
  },
  {
    name: "Neha Jain",
    rating: 5,
    text: "I was terrified of dentists but the team at Arunodaya Dental Clinic completely changed my perspective. They are patient, understanding, and make you feel at ease. Highly recommend for anyone with dental anxiety.",
    treatment: "Regular Check-up",
    date: "2 weeks ago",
  },
  {
    name: "Arun Patel",
    rating: 5,
    text: "Got my dental implants done here and couldn't be happier. The procedure was smooth, recovery was quick, and the results look completely natural. Dr. Prathmesh is truly an expert.",
    treatment: "Dental Implants",
    date: "1 month ago",
  },
  {
    name: "Sneha Dubey",
    rating: 5,
    text: "Took my daughter for her first dental check-up and Dr. Kalpana was wonderful with her — patient, kind, and put her completely at ease. She didn't cry once! The clinic is child-friendly and we'll definitely be back.",
    treatment: "Pediatric Dentistry",
    date: "3 months ago",
  },
  {
    name: "Rajesh Kumar",
    rating: 5,
    text: "Professional, clean, and affordable. The clinic uses modern equipment and follows strict hygiene protocols. I've been coming here for regular check-ups and always leave satisfied.",
    treatment: "Regular Check-up",
    date: "2 weeks ago",
  },
  {
    name: "Pooja Agrawal",
    rating: 5,
    text: "Finally found a dentist I can trust! Dr. Prathmesh took time to explain my treatment options and never pushed unnecessary procedures. The clinic atmosphere is calming and modern.",
    treatment: "Cavity Treatment",
    date: "1 month ago",
  },
];

const TestimonialsPage = () => {
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
                Patient Reviews
              </h1>
              <p className="text-white/80 text-lg leading-relaxed">
                Don't just take our word for it. Read what our patients have to say 
                about their experience at Arunodaya Dental Clinic.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Rating Summary */}
        <section className="py-12 bg-card border-b border-border">
          <div className="container-custom">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <div className="font-heading font-bold text-5xl text-foreground">4.8</div>
                  <div className="flex gap-1 justify-center my-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className="w-5 h-5 text-yellow-400 fill-yellow-400"
                      />
                    ))}
                  </div>
                  <div className="text-muted-foreground text-sm">Based on verified patient reviews</div>
                </div>

                <div className="h-20 w-px bg-border hidden md:block" />

                <div className="space-y-2">
                  {[
                    { stars: 5, percentage: 92 },
                    { stars: 4, percentage: 6 },
                    { stars: 3, percentage: 1.5 },
                    { stars: 2, percentage: 0.3 },
                    { stars: 1, percentage: 0.2 },
                  ].map((row) => (
                    <div key={row.stars} className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground w-3">{row.stars}</span>
                      <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                      <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-yellow-400 rounded-full"
                          style={{ width: `${row.percentage}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground">{row.percentage}%</span>
                    </div>
                  ))}
                </div>
              </div>

              <a
                href="https://www.google.com/maps/place/Arunodaya+Dental+Clinic/@23.1584693,79.9278784,1072m/data=!3m1!1e3!4m8!3m7!1s0x3981ae061079de5d:0x3b29742c45d2403b!8m2!3d23.159292!4d79.929748!9m1!1b1!16s%2Fg%2F11b_2sr3zh!5m1!1e2?entry=ttu&g_ep=EgoyMDI2MDUyNy4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary-dark transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Leave a Review on Google
              </a>
            </div>
          </div>
        </section>

        {/* Testimonials Grid */}
        <section className="section-padding bg-background">
          <div className="container-custom">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="testimonial-card relative"
                >
                  <Quote className="absolute top-6 right-6 w-8 h-8 text-primary/10" />
                  
                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  
                  {/* Quote */}
                  <p className="text-foreground/80 text-sm leading-relaxed mb-6">
                    "{testimonial.text}"
                  </p>
                  
                  {/* Author */}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-heading font-semibold text-foreground">
                        {testimonial.name}
                      </div>
                      <div className="text-muted-foreground text-xs">
                        {testimonial.treatment} · {testimonial.date}
                      </div>
                    </div>
                    <span className="text-xs font-medium text-accent bg-accent/10 px-3 py-1 rounded-full">
                      Verified
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <a
                href="https://g.page/dental-square-jabalpur"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
              >
                View All Reviews on Google
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-primary">
          <div className="container-custom text-center">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-6">
              Ready to Experience the Difference?
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
              Join our family of satisfied patients and discover why over 1,000 people 
              trust Arunodaya Dental Clinic with their smiles.
            </p>
            <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary rounded-xl font-semibold hover:bg-white/90 transition-colors shadow-lg">
              Book Your Appointment
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

export default TestimonialsPage;
