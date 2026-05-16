import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, Quote, ArrowRight } from "lucide-react";

const testimonials = [
  {
    name: "Priya S.",
    rating: 5,
    text: "The treatment here is painless and professional, absolutely recommended! Dr. Prathmesh is incredibly gentle and explains everything clearly.",
    treatment: "Root Canal",
  },
  {
    name: "Rahul M.",
    rating: 5,
    text: "Best dental clinic for root canal treatment! Clean clinic, skilled dentists, and great post-treatment care. Highly satisfied with the results.",
    treatment: "Smile Design",
  },
  {
    name: "Anjali K.",
    rating: 5,
    text: "Dr. Kalpana Sharma is incredibly patient and gentle. The treatment was quick and painless and the outcome was worth the wait.",
    treatment: "Smile Design",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="section-padding bg-background">
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
              Patient Reviews
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl font-heading font-bold text-foreground mt-3"
            >
              What Our Patients Say
            </motion.h2>
          </div>
          
          {/* Rating Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-4 bg-card p-4 rounded-2xl shadow-sm"
          >
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-5 h-5 ${
                    star <= 4.8 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <div>
              <div className="font-heading font-bold text-lg">4.8 / 5</div>
              <div className="text-muted-foreground text-xs">Verified Reviews</div>
            </div>
          </motion.div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
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
                    {testimonial.treatment}
                  </div>
                </div>
                <span className="text-xs font-medium text-accent bg-accent/10 px-3 py-1 rounded-full">
                  Verified Patient
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link
            to="/testimonials"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
          >
            Read More Reviews
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
